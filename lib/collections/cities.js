import slug from 'slug';
import GeocoderField from 'simple-react-form-bootstrap/lib/extras/geocoder';
import {TextField, TextareaField} from 'simple-react-form-bootstrap/lib/fields/string';
import CityGeoLocation from '/imports/components/admin/custom_form/city-location';
import HtmlEditor from '/imports/components/admin/custom_form/html-editor';
import ImageUpload from '/imports/components/admin/custom_form/image-upload';
import Select from 'simple-react-form-material-ui/lib/select';
import ShortText from '/imports/components/admin/custom_form/short-text';
import Text from 'simple-react-form-material-ui/lib/text';
import Toggle from 'simple-react-form-material-ui/lib/toggle';
// import CheckboxesComponent from 'simple-react-form-bootstrap/lib/fields/checkboxes';
// import { Factory } from 'meteor/dburles:factory';
// import faker from 'faker';
import { cloudinaryURL } from '/lib/utils.js';

SimpleSchema.extendOptions({
  srf: Match.Optional(Object)
});

CitiesCollection = new Mongo.Collection('cities');

CitiesCollection.allow({
  insert: function (userId, doc) {
    return userId;
  },
  update: function (userId, doc) {
    return userId;
  },
  remove: function (userId, doc) {
    return userId;
  }
});

CitiesCollection.deny({
  insert: function (userId, doc) {
    return !userId;
  },
  update: function (userId, doc) {
    return !userId;
  },
  remove: function (userId, doc) {
    return !userId;
  }
});

const CitiesSchema = new SimpleSchema({
  displayName: {
    type: String,
    max: 90,
    label: 'City',
    autoform: {
      afFieldInput: {
        'data-geo': 'locality',
      },
    },
    autoValue: function() {
      if((this.isInsert || this.isUpdate) && this.field('cityGeolocation.displayName').isSet) {
        return this.field('cityGeolocation.displayName').value;
      } else {
        this.unset();
      }
    },
  },
  cityName: {
    type: String,
    max: 180,
    autoform: {
      type: 'hidden',
    },
    autoValue: function() {
      if ((this.isInsert || this.isUpdate)&& this.field('displayName').isSet) {
        return slug(this.field('displayName').value, {lower: true}, '-');
      } else if (this.isUpsert) {
        return {$setOnInsert: slug(this.field('displayName').value, {lower: true}, '-')};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
  },
  state: {
    type: String,
    autoform: {
      afFieldInput: {
        'data-geo': 'administrative_area_level_1',
      },
    },
    autoValue: function() {
      if((this.isInsert || this.isUpdate) && this.field('cityGeolocation.state').isSet) {
        return this.field('cityGeolocation.state').value;
      } else {
        this.unset();
      }
    },
  },
  description: {
    type: String,
    // srf: {
    //   type: TextareaField,
    // },
    autoform: {
      afFieldInput: {
        type: 'summernote',
        settings: {
          height: 400,
          toolbar: [
            ['block', ['style']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['fontfamily',['fontname']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['color', ['color']],
            ['insert',['picture','link','video']],
            ['misc', ['fullscreen','codeview','undo','redo','help']]
          ],
        },
      }
    },
    autoValue: function() {
      if(Meteor.isServer) {
        return sanitizeHtml(this.value);
      } else {
        return this.value;
      }
    },
    srf: {
      type: HtmlEditor,
    },
  },
  location: {
    type: Object,
  },
  'location.lat': {
    type: Number,
    decimal: true,
    autoform: {
      afFieldInput: {
        'data-geo': 'lat',
      },
    },
    autoValue: function() {
      if((this.isInsert || this.isUpdate) && this.field('cityGeolocation.location.lat').isSet) {
        const _stringVal = this.field('cityGeolocation.location.lat').value;
        return parseFloat(_stringVal);
      } else {
        this.unset();
      }
    },
  },
  'location.lng': {
    type: Number,
    decimal: true,
    autoform: {
      afFieldInput: {
        'data-geo': 'lng',
      },
    },
    autoValue: function() {
      if((this.isInsert || this.isUpdate) && this.field('cityGeolocation.location.lng').isSet) {
        const _stringVal =  this.field('cityGeolocation.location.lng').value;
        return parseFloat(_stringVal);
      } else {
        this.unset();
      }
    },
  },
  guidePreview: {
    type: String,
    label: 'Guide Preview',

    autoform: {
      afFieldInput: {
        type: 'fileUpload',
      }
    },
    srf: {
      type: ImageUpload,
    },
  },
  photoCredit: {
    type: String,
    srf: {
      type: TextField,
    },
    label: 'Guide Preview Photo Credit',
    optional: true,
  },
  isDefault: {
    type: Boolean,
    defaultValue: false,
    label: 'Default City',
    srf: {
      type: Toggle,
    },
  },
  isPromoted: {
    type: Boolean,
    defaultValue: false,
    label: 'Promoted City',
    srf: {
      type: Toggle,
    },
  },
  printPreview: {
    type: String,
    label: 'Print Preview Image',
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
      }
    },
    srf: {
      type: ImageUpload,
    },
  },
  cityGuideAdSpaceImage: {
    type: String,
    label: 'City Guide Ad Space Image',
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
      }
    },
    srf: {
      type: ImageUpload,
    },
  },
  cityGuideAdSpaceURLlink: {
    type: String,
    label: 'City Guide Ad Space URL',
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    srf: {
      type: TextField,
    },
  },
  showAdSpaceImage: {
    type: Boolean,
    defaultValue: false,
    label: 'Show City Guide Ad Space Image instead of ad.',
    srf: {
      type: Toggle,
    },
  },
  printCopy: {
    type: String,
    label: 'Copy for Print Issue',
    autoform: {
      afFieldInput: {
        type: 'summernote',
        settings: {
          height: 400,
          toolbar: [
            ['block', ['style']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['fontfamily',['fontname']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['color', ['color']],
            ['insert',['picture','link','video']],
            ['misc', ['fullscreen','codeview','undo','redo','help']]
          ],
        },
      }
    },
    autoValue: function() {
      if(Meteor.isServer) {
        return sanitizeHtml(this.value);
      } else {
        return this.value;
      }
    },
    srf: {
      type: HtmlEditor,
    },
  },
  isFeatured: {
    type: Boolean,
    optional: true,
    defaultValue: false,
    label: 'Featured City',
    srf: {
      type: Toggle,
    },
  },
  printDownloadLink: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Download Link',
    srf: {
      type: TextField,
    },
  },
  showDownloadLink: {
    type: Boolean,
    optional: true,
    defaultValue: true,
    label: 'Show Download Link',
    srf: {
      type: Toggle,
    },
  },
  printPurchaseLink: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Print Purchase Link',
    srf: {
      type: TextField,
    },
  },
  showPurchaseLink: {
    type: Boolean,
    optional: true,
    defaultValue: true,
    label: 'Show Purchase Link',
    srf: {
      type: Toggle,
    },
  },
  showPrintGuide: {
    type: Boolean,
    optional: true,
    defaultValue: true,
    label: 'Show Print Guide',
    srf: {
      type: Toggle,
    },
  },
  cityGeolocation: {
    type: Object,
    label: 'City Name',
    srf: {
      type: CityGeoLocation,
      types: ['cities']
    },
  },
  'cityGeolocation.displayName': {
    type: String,
  },
  'cityGeolocation.state': {
    type: String,
  },
  'cityGeolocation.location.lat': {
    type: String,
  },
  'cityGeolocation.location.lng': {
    type: String,
  },
  hardRockId: {
    type: String,
    label: 'Hard Rock Location ID',
    optional: true,
    srf: {
      type: TextField,
    }
  },
  hardRockAltImage: {
    type: String,
    label: 'Hard Rock Alternate City Image',
    optional: true,
    srf: {
      type: ImageUpload,
    },
  },
});

CitiesCollection.attachSchema(CitiesSchema);

CitiesCollection.after.insert(function (userId, doc) {
  if(doc.isPromoted) {
    const otherPromotedCities = CitiesCollection.find({isPromoted:true, _id:{$ne: doc._id}}).fetch();
    for(let x = 0; x < otherPromotedCities.length; x++) {
      const demotedCity = otherPromotedCities[x];
      CitiesCollection.update({_id: demotedCity._id}, {$set: {isPromoted:false}});
    }
  }
});

CitiesCollection.after.update(function (userId, doc) {
  if(doc.isPromoted) {
    const otherPromotedCities = CitiesCollection.find({isPromoted:true, _id:{$ne: doc._id}}).fetch();
    for(let x = 0; x < otherPromotedCities.length; x++) {
      const demotedCity = otherPromotedCities[x];
      CitiesCollection.update({_id: demotedCity._id}, {$set: {isPromoted:false}});
    }
  }
});

// Factory.define('city', CitiesCollection, {
//   displayName: () => faker.address.city(),
//   cityName: () => faker.helpers.slugify(this.displayName),
//   state: () => faker.address.stateAbbr(),
//   description: () => faker.lorem.sentences(3),
//   location: {
//     lat: () => faker.address.latitude(),
//     lng: () => faker.address.longitude(),
//   },
//   guidePreview: () => faker.random.alphaNumeric(10),
//   photoCredit: () => faker.name.findName(),
//   isDefault: () => faker.random.boolean(),
//   isPromoted: () => faker.random.boolean(),
//   printPreview: () => faker.random.alphaNumeric(10),
//   cityGuideAdSpaceImage: () => faker.random.alphaNumeric(9),
//   cityGuideAdSpaceURLlink: () => faker.internet.url(),
//   showAdSpaceImage: () => faker.random.boolean(),
//   printCopy: () => faker.lorem.sentences(2),
//   isFeatured: () => faker.random.boolean(),
//   showDownloadLink: () => faker.random.boolean(),
//   printDownloadLink: () => (this.showDownloadLink) ? faker.internet.url() : '',
//   showPurchaseLink: () => faker.random.boolean(),
//   printPurchaseLink: () => (this.showPurchaseLink) ? faker.internet.url() : '',
//   showPrintGuide: () => faker.random.boolean(),
//   cityGeolocation: {
//     displayName: () => this.displayName,
//     state: () => this.state,
//     location: () => this.location,
//   },
//   hardRockId: () => faker.random.alphaNumeric(3),
//   hardRockAltImage: () => faker.random.alphaNumeric(12),
//  });

export {CitiesCollection};
