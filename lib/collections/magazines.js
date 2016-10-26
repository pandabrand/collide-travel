import ImageUpload from '/imports/components/admin/custom_form/image-upload';
import ShortText from '/imports/components/admin/custom_form/short-text';
import Text from 'simple-react-form-material-ui/lib/text'
import Toggle from 'simple-react-form-material-ui/lib/toggle'
import File from 'simple-react-form-material-ui/lib/file/index'

SimpleSchema.extendOptions({
  srf: Match.Optional(Object)
});

MagazinesCollection = new Mongo.Collection('magazines');

MagazinesCollection.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

// MagazinesCollection.allow({
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
// MagazinesCollection.deny({
//   update: function (userId, docs, fields, modifier) {
//     // can't change owners
//     return _.contains(fields, 'userId');
//   }
// });

MagazineSchema = new SimpleSchema({
  issue: {
    type: String,
    label: 'TWP Issue',
    srf: {
      type: ShortText
    },
  },
  guidePreview: {
    type: String,
    label: 'TWP Preview',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
      }
    },
    srf: {
      type: ImageUpload
    },
  },
  printDownloadLink: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    srf: {
      type: Text
    },
  },
  showDownloadLink: {
    type: Boolean,
    optional: true,
    defaultValue: true,
    srf: {
      type: Toggle
    },
  },
  printPurchaseLink: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    srf: {
      type: Text
    },
  },
  showPurchaseLink: {
    type: Boolean,
    optional: true,
    defaultValue: true,
    srf: {
      type: Toggle
    },
  },
  showPrintGuide: {
    type: Boolean,
    optional: true,
    defaultValue: true,
    srf: {
      type: Toggle
    },
  },
});

MagazinesCollection.attachSchema(MagazineSchema);

export {MagazinesCollection};
