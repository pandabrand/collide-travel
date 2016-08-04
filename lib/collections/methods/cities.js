import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { CitiesCollection } from '../cities.js';

Meteor.methods({
  'cities.insert'(city) {

    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      CitiesCollection.insert({
          displayName: city.displayName,
          cityName: city.cityName,
          state: city.state,
          location: city.location,
          lat: city.lat,
          lng: city.lng,
          guidePreview: city.guidePreview,
          isDefault: city.isDefault,
          isPromoted: city.isPromoted,
      });
    } else {
      throw new Meteor.Error('cities.insert',
        'Must have the correct permissions for insertion');
    }

  },
  'cities.remove'(cityId) {
    check(cityId, String);

    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      const city = CitiesCollection.findOne(cityId);

      CitiesCollection.remove(city);
    } else {
      throw new Meteor.Error('cities.remove',
        'Must have the correct permissions for removal');
    }
  },
  'cities.update'(updatedCity, id) {
    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      CitiesCollection.update({_id: id}, updatedCity);
    } else {
      throw new Meteor.Error('Cities.update',
        'Must have the correct permissions for updating');
    }
  },
});
