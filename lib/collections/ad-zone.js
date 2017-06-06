import Text from 'simple-react-form-material-ui/lib/text'
import Textarea from 'simple-react-form-material-ui/lib/textarea'
import Checkbox from 'simple-react-form-material-ui/lib/checkbox'
import Toggle from 'simple-react-form-material-ui/lib/toggle'

SimpleSchema.extendOptions({
  srf: Match.Optional(Object)
});

AdZoneCollection = new Mongo.Collection('adzones');

AdZoneCollection.allow({
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

AdZoneCollection.deny({
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

AdZoneSchema = new SimpleSchema({
  topAd: {
    type: String,
    label: 'Top Banner Ad',
    optional: true,
    srf: {
      type: Textarea,
      rows: 3
    },
  },
  showTopBannerAd: {
    type: Boolean,
    label: 'Show Banner Ad',
    defaultValue: false,
    srf: {
      type: Toggle
    },
  },
  cityGuideAd: {
    type: String,
    label: 'City Guide Ad',
    optional: true,
    srf: {
      type: Textarea,
      rows: 3
    }
  },
  takeoverAd: {
    type: String,
    label: 'Ad Takeover',
    optional: true,
    srf: {
      type: Textarea,
      rows: 3
    }
  },
  showAdTakeover: {
    type: Boolean,
    label: 'Activate Ad Takeover',
    optional: true,
    srf: {
      type: Toggle
    },
  },
});

AdZoneCollection.attachSchema(AdZoneSchema);

export {AdZoneCollection};
