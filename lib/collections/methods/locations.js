import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { LocationsCollection } from '../locations.js';
import { CitiesCollection } from '../cities.js';

Meteor.methods({
  'locations.geoAndinsert'(location) {
    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      LocationsCollection.insert({
          name: location.name,
          cityId: location.cityId,
          state: location.state,
          location: location.location,
          lat: location.lat,
          lng: location.lng,
          type: location.type,
          address: location.address,
          photo: location.photo,
          description: location.description,
          website: location.website,
      });
    } else {
      throw new Meteor.Error('locations.insert',
        'Must have the correct permissions for insertion');
    }

  },
  'locations.insert'(location) {

    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      LocationsCollection.insert({
          name: location.name,
          cityId: location.cityId,
          state: location.state,
          location: location.location,
          lat: location.lat,
          lng: location.lng,
          type: location.type,
          address: location.address,
          photo: location.photo,
          description: location.description,
          website: location.website,
      });
    } else {
      throw new Meteor.Error('locations.insert',
        'Must have the correct permissions for insertion');
    }

  },
  'locations.remove'(locationId) {
    check(locationId, String);

    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      const location = LocationsCollection.findOne(locationId);

      LocationsCollection.remove(location);
    } else {
      throw new Meteor.Error('locations.remove',
        'Must have the correct permissions for removal');
    }
  },
  'locations.update'(updatedLocation, id) {
    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      LocationsCollection.update({_id: id}, updatedLocation);
    } else {
      throw new Meteor.Error('Locations.update',
        'Must have the correct permissions for updating');
    }
  },
  getLocationOptions: function (option) {
    var locationOptions = LocationsCollection.find({cityId:option},{name:1}).fetch().map((location) => {
      return {label: location.name, value: location._id};
    });
    return locationOptions;
  },
});
