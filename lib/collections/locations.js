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
        type: 'universe-select',
        options: function() {
          return CitiesCollection.find().map((city) => {
            return {label: city.displayName, value: city._id};
          });
        },
      },
    },
  },
  description: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'summernote',
        settings: {
          height: 400,
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
    autoform: {
      afFieldInput: {
        type: 'cloudinary',
      }
    }
  },
  website: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
  },
});

LocationsCollection.attachSchema(LocationsSchema);
