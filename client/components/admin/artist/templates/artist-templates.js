import { Template } from 'meteor/templating';
import { ArtistsCollection } from "../../../../../lib/collections/artists.js";
import { CitiesCollection } from "../../../../../lib/collections/cities.js";
import { LocationsCollection } from "../../../../../lib/collections/locations.js";

Template.addNewArtist.helpers({
  Artists() {
    return ArtistsCollection;
  },
  locationOptions: function() {
    var form_city = AutoForm.getFieldValue('cityId');
    locations = LocationsCollection.find({cityId: form_city}).fetch();
    return locations.map((loc) => {
      return {label: loc.name, value: loc._id};
    });
  },
});

Template.addNewArtist.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('cities');
    self.subscribe('all-locations');
    // self.subscribe('locations', null);
  });
});


Template.addNewArtist.events({
  'click': function() {
    //Add cityName to the artist doc from location id
    return true;
  }
});

Template.updateArtist.events({
  'click': function() {
    //Add cityName to the artist doc from location id
    return true;
  }
});

Template.updateArtist.helpers({
  Artists() {
    return ArtistsCollection;
  },
});

Template.updateArtist.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('artist', id);
    self.subscribe('cities');
    self.subscribe('all-locations');
  });
});

Template.updateArtist.helpers({
  artist: function() {
    var id = FlowRouter.getParam('id');
    var artist = ArtistsCollection.findOne({_id: id}) || {};
    return artist;
  },
  locationOptions: function() {
    var form_city = AutoForm.getFieldValue('cityId');
    locations = LocationsCollection.find({cityId: form_city}).fetch();
    return locations.map((loc) => {
      return {label: loc.name, value: loc._id};
    });
  }
});

Template.updateArtist.onRendered(function() {
})
