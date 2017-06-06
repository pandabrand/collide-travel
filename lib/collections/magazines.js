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

MagazinesCollection.deny({
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
