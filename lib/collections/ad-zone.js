export const AdZoneCollection = new Mongo.Collection('adzones');

export default AdZoneSchema = new SimpleSchema({
  topAd: {
    type: String,
    label: 'Top Banner Ad',
    optional: true,
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
