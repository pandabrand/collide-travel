import { Template } from 'meteor/templating';
import { ArtistsCollection } from "../../../../../lib/collections/artists.js";
import { ArtistCommentsCollection } from "../../../../../lib/collections/artist-comments.js";
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
  const id = FlowRouter.getParam('id');
  const artist = ArtistsCollection.findOne({_id: id}) || {};
  let locationsToSelect = [];
  Tracker.autorun(function() {
    locations = LocationsCollection.find({cityId:artist.cityId}).fetch();
    locations.map((loc) => {
      if(_.contains(artist.locationIds,loc._id)) {
        locationsToSelect.push({label: loc.name, value: loc._id});
      }
    });
  });
  $('.artist-location-select').select2('data', locationsToSelect);
});

Template.updateArtistComments.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('artist-comments-edit', id);
  });
});

Template.updateArtistComments.helpers({
  artist: function() {
    return ArtistsCollection.findOne();
  },
  location: function() {
    return LocationsCollection.findOne({_id:this.locationId});
  },
  ArtistCommentsCollection() {
    return ArtistCommentsCollection;
  },
  comments: function() {
    return ArtistCommentsCollection.find({artistId:FlowRouter.getParam('id')});
  },
  formId: function() {
    return 'artist-comments-' + this._id;
  },
});
