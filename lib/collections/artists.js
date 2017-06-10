import {CitiesCollection} from './cities.js';
import {LocationsCollection} from './locations.js';
import slug from 'slug';
import HtmlEditor from '/imports/components/admin/custom_form/html-editor';
import ImageUpload from '/imports/components/admin/custom_form/image-upload';
import CCColorPicker from '/imports/components/admin/custom_form/colorpicker';
import CCSelect from '/imports/components/admin/custom_form/select';
import Select from 'simple-react-form-material-ui/lib/select';
import ShortText from '/imports/components/admin/custom_form/short-text';
import Text from 'simple-react-form-material-ui/lib/text';
import Textarea from 'simple-react-form-material-ui/lib/textarea'
import Toggle from 'simple-react-form-material-ui/lib/toggle';
import {ArtistCommentsCollection} from './artist-comments';

// import { Factory } from 'meteor/dburles:factory';
// import faker from 'faker';

ArtistsCollection = new Mongo.Collection('artists');

SimpleSchema.extendOptions({
  materialForm: Match.Optional(Object)
});

ArtistsCollection.allow({
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

ArtistsCollection.deny({
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

export default ArtistsSchema = new SimpleSchema({
  artistName: {
    type: String,
    max: 90,
    srf: {
      type: Text,
    },
  },
  artistSlug: {
    type: String,
    max: 100,
    autoValue: function() {
      if ((this.isInsert || this.isUpdate) && this.field('artistName').isSet) {
        var artSlug = slug(this.field('artistName').value, {lower: true}, '-');
        return artSlug;
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
    autoform: {
      type: 'hidden',
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
    },
  },
  cityName: {
    type: String,
    optional: true,
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
  locationIds: {
    type: [String],
    label: 'Locations',
    autoform: {
      type: 'select2',
      class: 'artist-location-select',
      afFieldInput: {
        multiple: true,
        tags: true,
      },
    },
    srf: {
      type: CCSelect,
    },
  },
  image: {
    type: String,
    label: 'Artist Image',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
      },
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
      type: Text,
    },
  },
  description: {
    type: String,
    label: 'City Guide Copy',
    autoform: {
      // afFieldInput: {
      //   type: 'summernote',
      //   settings: {
      //     height: 400,
      //     toolbar: [
      //       ['block', ['style']],
      //       ['style', ['bold', 'italic', 'underline', 'clear']],
      //       ['font', ['strikethrough', 'superscript', 'subscript']],
      //       ['fontsize', ['fontsize']],
      //       ['fontfamily',['fontname']],
      //       ['para', ['ul', 'ol', 'paragraph']],
      //       ['color', ['color']],
      //       ['insert',['picture','link','video']],
      //       ['misc', ['fullscreen','codeview','undo','redo','help']]
      //     ],
      //   },
      // },
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
  color: {
    type: String,
    label: 'Guide and Map Color',
    autoform: {
      type: 'bootstrap-colorpicker',
    },
    srf: {
      type: CCColorPicker,
    },
  },
  soundcloud: {
    type: String,
    label: 'Embed',
    optional: true,
    autoform: {
      rows: 7,
      // afFieldInput: {
      //   type: 'summernote',
      //   settings: {
      //     height: 400,
      //     toolbar: [
      //       ['block', ['style']],
      //       ['style', ['bold', 'italic', 'underline', 'clear']],
      //       ['font', ['strikethrough', 'superscript', 'subscript']],
      //       ['fontsize', ['fontsize']],
      //       ['fontfamily',['fontname']],
      //       ['para', ['ul', 'ol', 'paragraph']],
      //       ['color', ['color']],
      //       ['insert',['picture','link','video']],
      //       ['misc', ['fullscreen','codeview','undo','redo','help']]
      //     ],
      //   },
      // },
    },
    srf: {
      type: Textarea,
      rows: 7,
    }
    // autoValue: function() {
    //   if(Meteor.isServer && this.value) {
    //     return sanitizeHtml(this.value, {allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'iframe','embed' ])});
    //   } else {
    //     return this.value;
    //   }
    // },
  },
  isFeatured: {
    type: Boolean,
    label: 'Featured Artist',
    defaultValue: false,
    srf: {
      type: Toggle,
    },
  },
  artistsLocationsComment: {
    type: [Object],
  },
  'artistsLocationsComment.$.locationId': {
    type: String,
  },
  'artistsLocationsComment.$.locationComment': {
    type: String,
    srf: {
      type: HtmlEditor,
    }
  }
});

ArtistsCollection.attachSchema(ArtistsSchema);

ArtistsCollection.after.insert(function (userId, doc) {
  // make sure there are artistsComments
  for(var i = 0; i < doc.locationIds.length; i++) {
    ArtistCommentsCollection.insert({
      artistId: doc._id,
      locationId: doc.locationIds[i],
      comment: '',
    });
  }

});

ArtistsCollection.after.update(function (userId, doc) {
  //clear any comments that aren't needed
  const comments = ArtistCommentsCollection.find({artistId:doc._id}).fetch();
  const commentLocationIds = _.pluck(comments, 'locationId');
  const toDelete = _.difference(commentLocationIds, doc.locationIds);
  _.each(toDelete, (deleteId) => {ArtistCommentsCollection.remove(deleteId)});

  //add the ones that were added
  const newcomments = ArtistCommentsCollection.find({artistId:doc._id}).fetch();
  const newCommentLocationIds = _.pluck(newcomments, 'locationId');
  const toAdd = _.difference(doc.locationIds, newCommentLocationIds);
  _.each(tAdd, (addId) => {
    ArtistCommentsCollection.insert({
      artistId: doc._id,
      locationId: addId,
      comment: '',
    });
  })
});

ArtistsCollection.after.remove(function(userId, doc) {
  ArtistCommentsCollection.remove({artistId:doc._id});
});

_artistName = faker.commerce.productName();
_artistLocations = [faker.random.alphaNumeric(5), faker.random.alphaNumeric(5)];
_artistComments = _.map(_artistLocations, function(id) {
  return {locationId:id, locationComment: faker.lorem.sentences(2)};
});

// Factory.define('artist',ArtistsCollection, {
//   artistName: () => _artistName,
//   artistSlug: () => faker.helpers.slugify(this.artistName),
//   // cityId: () => faker.random.alphaNumeric(15),
//   cityName: () => faker.address.city(),
//   locationIds: () => _artistLocations,
//   image: () => faker.random.alphaNumeric(15),
//   photoCredit: () => faker.name.findName(),
//   description: () => faker.lorem.sentences(5),
//   color: () => faker.internet.color(),
//   soundcloud: () => faker.internet.url(),
//   isFeatured: () => faker.random.boolean(),
//   artistsLocationsComment: () => _artistComments,
// });


export {ArtistsCollection};
