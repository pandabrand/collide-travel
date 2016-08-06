import { Template } from 'meteor/templating';
import { LocationsCollection } from "../../../../../lib/collections/locations.js";
import slug from 'slug';

Template.addNewLocation.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('cities' );
  });
});

Template.addNewLocation.onRendered(function() {
  this.autorun(function() {
    if(GoogleMaps.loaded()) {
      $('[name="address"]').geocomplete({
        details: '.geo-details',
        detailsAttribute: 'data-geo',
      });
    }
  });
});

Template.addNewLocation.helpers({
  Locations() {
    return LocationsCollection;
  },
});

Template.updateLocation.helpers({
  Locations() {
    return LocationsCollection;
  }
});

Template.updateLocation.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('location', id);
    self.subscribe('cities');
  });
});

Template.updateLocation.onRendered(function() {
  this.autorun(function() {
    if(GoogleMaps.loaded()) {
      $('[name="address"]').geocomplete({
        details: '.geo-details',
        detailsAttribute: 'data-geo',
      });
    }
  });
});

Template.updateLocation.helpers({
  location: function() {
    var id = FlowRouter.getParam('id');
    var location = LocationsCollection.findOne({_id: id}) || {};
    return location;
  }
});
