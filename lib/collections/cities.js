import slug from 'slug';
import GeocoderField from 'simple-react-form-bootstrap/lib/extras/geocoder';
import {TextField, TextareaField} from 'simple-react-form-bootstrap/lib/fields/string';
// import CheckboxesComponent from 'simple-react-form-bootstrap/lib/fields/checkboxes';

CitiesCollection = new Mongo.Collection('cities');

CitiesCollection.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
// CitiesCollection.allow({
//   insert: function (userId, doc) {
//     return userId;
//   },
//   update: function (userId, doc, fields, modifier) {
//     // can only change your own documents
//     return doc.userId === userId;
//   },
//   remove: function (userId, doc) {
//     // can only remove your own documents
//     return doc.userId === userId;
//   }
// });
//
// CitiesCollection.deny({
//   update: function (userId, docs, fields, modifier) {
//     // can't change owners
//     return _.contains(fields, 'userId');
//   }
// });

const CitiesSchema = new SimpleSchema({
  displayName: {
    type: String,
    srf: {
      type: GeocoderField,
    },
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
    srf: {
      type: TextareaField,
    },
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
        type: 'fileUpload',
      }
    }
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
        type: 'fileUpload',
      }
    }
  },
  cityGuideAdSpaceImage: {
    type: String,
    label: 'City Guide Ad Space Image',
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
      }
    }
  },
  cityGuideAdSpaceURLlink: {
    type: String,
    label: 'City Guide Ad Space URL',
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
  },
  showAdSpaceImage: {
    type: Boolean,
    defaultValue: false,
    label: 'Show City Guide Ad Space Image instead of ad.'
  },
  printCopy: {
    type: String,
    srf: {
      type: TextareaField,
    },
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

export {CitiesCollection};
