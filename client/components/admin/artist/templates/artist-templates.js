import { Template } from 'meteor/templating';
import { ArtistsCollection } from "../../../../../lib/collections/artists.js";
import { CitiesCollection } from "../../../../../lib/collections/cities.js";
import { LocationsCollection } from "../../../../../lib/collections/locations.js";

Template.addNewArtist.helpers({
  Artists() {
    return ArtistsCollection;
  }
});

Template.addNewArtist.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('cities');
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
  s2opts: function() {
    var id = FlowRouter.getParam('id');
    var artist = ArtistsCollection.findOne({_id: id}) || {};
    return {placeholder: 'Select a City Where the Artist Lives.', tags: true};
  },
  ls2opts: function() {
    return {placeholder: 'Select a Locations Where the Artist Likes to hang.', tags: true};
  }
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
  cityOptions: function() {

  },
  locationOptions: function() {
    var id = FlowRouter.getParam('id');
    var artist = ArtistsCollection.findOne({_id: id}) || {};
    var form_city = AutoForm.getFieldValue('cityId');
    console.log('locations: city: ' + form_city);
    if(artist) {
      locations = LocationsCollection.find({cityId: form_city}).fetch();
      return locations.map((loc) => {
        return {label: loc.name, value: loc._id};
      });
    }
  }
});

Template.updateArtist.onRendered(function() {
})
