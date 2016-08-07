export const CitiesCollection = new Mongo.Collection('cities');
import slug from 'slug';

CitiesSchema = new SimpleSchema({
  displayName: {
    type: String,
    max: 90,
    label: 'City',
    autoform: {
      afFieldInput: {
        'data-geo': 'locality',
      },
    },
  },
  cityName: {
    type: String,
    max: 180,
    autoform: {
      type: 'hidden',
    },
    autoValue: function() {
      if (this.isInsert && this.field('displayName').isSet) {
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
    // allowedValues: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],
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
    }
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
  },
  'location.lng': {
    type: Number,
    decimal: true,
    autoform: {
      afFieldInput: {
        'data-geo': 'lat',
      },
    },
  },
  guidePreview: {
    type: String,
    label: 'Guide Preview',
    autoform: {
      afFieldInput: {
        type: 'cloudinary',
      }
    }
  },
  isDefault: {
    type: Boolean,
    defaultValue: false,
    label: 'Default City'
  },
  isPromoted: {
    type: Boolean,
    defaultValue: false,
    label: 'Promoted City',
  }
});

CitiesCollection.attachSchema(CitiesSchema);
