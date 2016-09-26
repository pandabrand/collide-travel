export const LocationsCollection = new Mongo.Collection('locations');
import {CitiesCollection} from './cities.js';

LocationsSchema = new SimpleSchema({
  name: {
    type: String,
    max: 90
  },
  type: {
    type: String,
    max: 20,
  },
  address: {
    type: String,
    max: 200,
    autoform: {
      afFieldInput: {
        'data-geo': 'formatted_address',
      },
    },
  },
  addressNumber: {
    type: String,
    autoform: {
      afFieldInput: {
        'data-geo' : 'street_number'
      }
    }
  },
  addressStreet: {
    type: String,
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
    autoValue: function() {
      if(Meteor.isServer) {
        return sanitizeHtml(this.value);
      } else {
        return this.value;
      }
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
    autoform: {
      afFieldInput: {
        'data-geo': 'lat',
      },
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
  },
  photo: {
    type: String,
    label: 'Location Photo',
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
      }
    }
  },
  photoCredit: {
    type: String,
    label: 'Photo Credit',
    optional: true,
  },
  website: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
  },
  isFeatured: {
    type: Boolean,
    optional: true,
    defaultValue: false,
  },
});

LocationsCollection.attachSchema(LocationsSchema);
