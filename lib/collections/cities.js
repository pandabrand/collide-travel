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
  cityGuideAdSpaceImage: {
    type: String,
    label: 'City Guide Ad Space Image',
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'cloudinary',
      }
    }
  },
  showAdSpaceImage: {
    type: Boolean,
    defaultValue: false,
    label: 'Show City Guide Ad Space Image instead of ad.'
  },
  printCopy: {
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
  isFeatured: {
    type: Boolean,
    optional: true,
    defaultValue: false,
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
