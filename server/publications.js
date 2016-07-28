import { Cities } from '../lib/collections/cities.js';
import { Locations } from '../lib/collections/locations.js';

Meteor.publish('cities', function() {
  return Cities.find();
});

Meteor.publish('promoted-city', function() {
  return Cities.find({$or: [{isPromoted: true},{isDefault: true}]});
});

Meteor.publish('locations', function(cityId){
  return Locations.find({cityId});
});

Meteor.publish('categories', function(){
  return Locations.find();
});
