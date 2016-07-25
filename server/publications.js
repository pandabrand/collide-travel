import { Cities } from '../lib/collections/cities.js';

Meteor.publish('cities', function() {
  return Cities.find();
});

Meteor.publish('promoted-city', function() {
  return Cities.find({$or: [{isPromoted: true},{isDefault: true}]});
});
