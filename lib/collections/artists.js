export const ArtistsCollection = new Mongo.Collection('artists');
import {CitiesCollection} from './cities.js';
import {LocationsCollection} from './locations.js';
import slug from 'slug';

export default ArtistsSchema = new SimpleSchema({
  artistName: {
    type: String,
    max: 90
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
      type: 'select2',
      class: 'artist-location-select',
      afFieldInput: {
        multiple: true,
        tags: true,
      },
    }
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
      },
    },
    autoValue: function() {
      if(Meteor.isServer) {
        return sanitizeHtml(this.value, {allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'iframe','embed' ])});
      } else {
        return this.value;
      }
    },
  },
  isFeatured: {
    type: Boolean,
    label: 'Featured Artist',
    defaultValue: false,
  }
});

ArtistsCollection.attachSchema(ArtistsSchema);
