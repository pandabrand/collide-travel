export const MagazinesCollection = new Mongo.Collection('magazines');

MagazinesCollection.allow({
  insert: function (userId, doc) {
    return userId;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.userId === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.userId === userId;
  }
});

MagazinesCollection.deny({
  update: function (userId, docs, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'userId');
  }
});

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
