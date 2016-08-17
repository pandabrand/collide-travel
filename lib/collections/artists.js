export const ArtistsCollection = new Mongo.Collection('artists');
import {CitiesCollection} from './cities.js';
import {LocationsCollection} from './locations.js';
import slug from 'slug';

ArtistsSchema = new SimpleSchema({
  artistName: {
    type: String,
    max: 90
  },
  artistSlug: {
    type: String,
    max: 100,
    autoValue: function() {
      console.log('autoValue');
      if ((this.isInsert || this.isUpdate) && this.field('artistName').isSet) {
        console.log('is an insert');
        var artSlug = slug(this.field('artistName').value, {lower: true}, '-');
        console.dir(artSlug);
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
  locationIds: {
    type: [String],
    label: 'Locations',
    autoform: {
      type: 'select-multiple',
    },
  },
  image: {
    type: String,
    label: 'Artist Image',
    autoform: {
      afFieldInput: {
        type: 'cloudinary',
      },
    },
  },
  description: {
    type: String,
    label: 'City Guide Copy',
    autoform: {
      afFieldInput: {
        type: 'summernote',
        settings: {
          height: 400,
        },
      },
    },
    autoValue: function() {
      if(Meteor.isServer) {
        return sanitizeHtml(this.value);
      } else {
        return this.value;
      }
    },
  },
  color: {
    type: String,
    label: 'Guide and Map Color',
    autoform: {
      type: 'bootstrap-colorpicker',
    },
  },
  soundcloud: {
    type: String,
    label: 'Soundcloud Embed',
    optional: true,
    autoValue: function() {
      if(Meteor.isServer) {
        return sanitizeHtml(this.value, {allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'embed' ])});
      } else {
        return this.value;
      }
    }
  }
});

ArtistsCollection.attachSchema(ArtistsSchema);
