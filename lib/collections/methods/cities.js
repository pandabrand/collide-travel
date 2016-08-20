import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { CitiesCollection } from '../cities.js';

Meteor.methods({
  'cities.insert'(city) {
    CitiesCollection.simpleSchema().clean(city,{
      extendAutoValueContext: {
        isInsert: true,
        isUpdate: false,
        isUpsert: false,
        isFromTrustedCode: false,
      }
    });

    check(city, {
      displayName: String,
      cityName: String,
      state: String,
      location: Object,
      lat: Number,
      lat: Number,
      guidePreview: String,
      isDefault: Boolean,
      isPromoted: Boolean,
    });

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
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

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
      const city = CitiesCollection.findOne(cityId);

      CitiesCollection.remove(city);
    } else {
      throw new Meteor.Error('cities.remove',
        'Must have the correct permissions for removal');
    }
  },
  'cities.update'(updatedCity, id) {
    CitiesCollection.simpleSchema().clean(updatedCity,{
      extendAutoValueContext: {
        isInsert: false,
        isUpdate: true,
        isUpsert: false,
        isFromTrustedCode: false,
      }
    });

    check(id, String);
    check(updatedCity, Object);

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
      CitiesCollection.update({_id: id}, updatedCity);
    } else {
      throw new Meteor.Error('Cities.update',
        'Must have the correct permissions for updating');
    }
  },
  getCityOptions: function () {
    var cityOptions = CitiesCollection.find({},{displayName:1}).fetch().map((city) => {
      return {label: city.displayName, value: city._id};
    });
    return cityOptions;
  },
});
