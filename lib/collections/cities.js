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
  },
  printPreview: {
    type: String,
    label: 'Print Preview Image',
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'cloudinary',
      }
    }
  },
  printCopy: {
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
  printDownloadLink: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
  },
  showDownloadLink: {
    type: Boolean,
    optional: true,
    defaultValue: true,
  },
  printPurchaseLink: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
  },
  showPurchaseLink: {
    type: Boolean,
    optional: true,
    defaultValue: true,
  },
  showPrintGuide: {
    type: Boolean,
    optional: true,
    defaultValue: true,
  },
});

CitiesCollection.attachSchema(CitiesSchema);
