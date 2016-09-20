export const MagazinesCollection = new Mongo.Collection('magazines');

MagazineSchema = new SimpleSchema({
  issue: {
    type: String,
    label: 'TWP Issue',
  },
  guidePreview: {
    type: String,
    label: 'TWP Preview',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
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

MagazinesCollection.attachSchema(MagazineSchema);
