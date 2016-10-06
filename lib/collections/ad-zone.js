export const AdZoneCollection = new Mongo.Collection('adzones');
AdZoneCollection.allow({  
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

AdZoneCollection.deny({
  update: function (userId, docs, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'userId');
  }
});

export default AdZoneSchema = new SimpleSchema({
  topAd: {
    type: String,
    label: 'Top Banner Ad',
    optional: true,
  },
  showTopBannerAd: {
    type: Boolean,
    label: 'Show Banner Ad',
    defaultValue: false,
  },
  cityGuideAd: {
    type: String,
    label: 'City Guide Ad',
    optional: true,
  },
  takeoverAd: {
    type: String,
    label: 'Ad Takeover',
    optional: true,
  },
  showAdTakeover: {
    type: Boolean,
    label: 'Activate Ad Takeover',
    optional: true,
  },
});

AdZoneCollection.attachSchema(AdZoneSchema);
