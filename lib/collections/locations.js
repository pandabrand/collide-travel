import GeoLocation from '/imports/components/admin/custom_form/geo-location';
import HtmlEditor from '/imports/components/admin/custom_form/html-editor';
import ImageUpload from '/imports/components/admin/custom_form/image-upload';
import Select from 'simple-react-form-material-ui/lib/select';
import ShortText from '/imports/components/admin/custom_form/short-text';
import Text from 'simple-react-form-material-ui/lib/text';
import Toggle from 'simple-react-form-material-ui/lib/toggle';

import {CitiesCollection} from './cities.js';
import {ArtistsCollection} from './artists.js';
import {ArtistCommentsCollection} from './artist-comments.js';

// import { Factory } from 'meteor/dburles:factory';
// import faker from 'faker';

LocationsCollection = new Mongo.Collection('locations');

SimpleSchema.extendOptions({
  materialForm: Match.Optional(Object)
});

LocationsCollection.allow({
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

LocationsCollection.deny({
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

LocationsSchema = new SimpleSchema({
  name: {
    type: String,
    max: 90,
    srf: {
      type: Text,
    },
  },
  type: {
    type: String,
    max: 20,
    srf: {
      type: Text,
    },
  },
  geolocation: {
    type: Object,
    label: 'Address',
    srf: {
      type: GeoLocation,
      types: ['geocode']
    },
  },
  'geolocation.address': {
    type: String,
  },
  'geolocation.street_number': {
    type: String,
  },
  'geolocation.route': {
    type: String,
  },
  'geolocation.location': {
    type: Object,
  },
  'geolocation.location.lat': {
    type: String,
  },
  'geolocation.location.lng': {
    type: String,
  },
  address: {
    type: String,
    autoValue: function() {
      if((this.isInsert || this.isUpdate) && this.field('geolocation.address').isSet) {
        return this.field('geolocation.address').value;
      } else {
        this.unset();
      }
    },
    max: 200,
    autoform: {
      afFieldInput: {
        'data-geo': 'formatted_address',
      },
    },
  },
  addressNumber: {
    type: String,
    autoValue: function() {
      if((this.isInsert || this.isUpdate) && this.field('geolocation.street_number').isSet) {
        return this.field('geolocation.street_number').value;
      } else {
        this.unset();
      }
    },
    autoform: {
      afFieldInput: {
        'data-geo' : 'street_number'
      }
    }
  },
  addressStreet: {
    type: String,
    autoValue: function() {
      if((this.isInsert || this.isUpdate) && this.field('geolocation.route').isSet) {
        return this.field('geolocation.route').value;
      } else {
        this.unset();
      }
    },
    autoform: {
      afFieldInput: {
        'data-geo': 'route',
      },
    },
  },
  cityId: {
    type: String,
    label: 'City',
    autoform: {
      afFieldInput: {
        type: 'select',
        options: function() {
          return CitiesCollection.find().map((city) => {
            return {label: city.displayName, value: city._id};
          });
        },
      },
    },
    srf: {
      type: Select,
      // options: function() {
      //   return CitiesCollection.find().map((city) => {
      //     return {label: city.displayName, value: city._id};
      //   });
      // },
    }
  },
  cityName: {
    type: String,
    autoValue: function() {
      if((this.isInsert || this.isUpdate) && this.field('cityId').isSet) {
        var cityId = this.field('cityId').value;
        var cName = CitiesCollection.findOne({_id:cityId},{cityName:1});
        return cName.cityName;
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
    },
  },
  description: {
    type: String,
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
    autoValue: function(doc) {
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
    // This should probably not be optional, check this later
    optional: true,
    autoform: {
    },
  },
  'location.lat': {
    type: Number,
    decimal: true,
    autoValue: function() {
      if((this.isInsert || this.isUpdate) && this.field('geolocation.location.lat').isSet) {
        const _stringVal = this.field('geolocation.location.lat').value;
        return parseFloat(_stringVal);
      } else {
        this.unset();
      }
    },
    autoform: {
      afFieldInput: {
        'data-geo': 'lat',
      },
    },
  },
  'location.lng': {
    type: Number,
    decimal: true,
    autoValue: function() {
      if((this.isInsert || this.isUpdate) && this.field('geolocation.location.lng').isSet) {
        const _stringVal =  this.field('geolocation.location.lng').value;
        return parseFloat(_stringVal);
      } else {
        this.unset();
      }
    },
    autoform: {
      afFieldInput: {
        'data-geo': 'lng',
      },
    },
  },
  photo: {
    type: String,
    label: 'Location Photo',
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
  photoCredit: {
    type: String,
    label: 'Photo Credit',
    optional: true,
    srf: {
      type: ShortText,
    },
  },
  website: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    srf: {
      type: Text,
    },
  },
  isFeatured: {
    type: Boolean,
    optional: true,
    defaultValue: false,
    srf: {
      type: Toggle,
    },
  },
  hardRockAltImage: {
    type: String,
    label: 'Hard Rock Alternate Location Photo',
    optional: true,
    srf: {
      type: ImageUpload,
    },
  },
  longDescription: {
    type: String,
    label: 'Long Description',
    optional: true,
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
});

LocationsCollection.attachSchema(LocationsSchema);

LocationsCollection.before.update(function(userId, doc) {
  // console.dir(doc);
});

LocationsCollection.after.remove(function(userId, doc) {
  ArtistCommentsCollection.remove({locationId:doc._id});
  ArtistsCollection.update({}, {$pull:{locationIds:doc._id}}, {multi: true});
});

// Factory.define('location', LocationsCollection, {
//   name: () => faker.company.companyName(),
//   type: () => faker.commerce.department(),
//   geolocation: {
//     address: () => faker.address.streetAddress(),
//     street_number: () => faker.address.streetPrefix(),
//     route: () => faker.address.streetName(),
//     location: {
//       lat: () => faker.address.latitude(),
//       lng: () => faker.address.longitude(),
//     },
//   },
//   description: () => faker.lorem.sentences(3),
//   photo: () => faker.random.alphaNumeric(8),
//   photoCredit: () => faker.name.findName(),
//   website: () => faker.internet.url(),
//   isFeatured: () => faker.random.boolean(),
//   hardRockAltImage: () => faker.random.alphaNumeric(9),
//   longDescription: () => faker.lorem.paragraphs(3),
// });

export {LocationsCollection};
