import { Template } from 'meteor/templating';
import { AdZoneCollection } from "../../../../lib/collections/ad-zone.js";

Template.updateAd.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('get-ad');
  });
});

Template.updateAd.onRendered(function() {
});

Template.updateAd.helpers({
  ad: function() {
    var _ad = AdZoneCollection.findOne({}) || {};
    return _ad;
  },
  AdZoneCollection() {
    return AdZoneCollection;
  }
});
