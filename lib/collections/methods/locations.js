import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { LocationsCollection } from '../locations.js';

Meteor.methods({
  getLocationOptions: function (option) {
    console.log('we are getting location options');
    var locationOptions = LocationsCollection.find({cityId:option},{name:1}).fetch().map((location) => {
      return {label: location.name, value: location._id};
    });
    return locationOptions;
  },
});
