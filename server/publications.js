import { Cities } from '../lib/collections/cities.js';
import { Locations } from '../lib/collections/locations.js';
import { Artists } from '../lib/collections/artists.js';
import { ArtistComments } from '../lib/collections/artist-comments.js';

Meteor.publish('cities', function() {
  return Cities.find();
});

Meteor.publish('find-city', function(cityName) {
  cities = Cities.find({cityName:cityName});
  return cities;
});

Meteor.publish('find-city-id', function(id) {
  cities = Cities.find({_id:id});
  return cities;
});

Meteor.publish('promoted-city', function() {
  return Cities.find({$or: [{isPromoted: true},{isDefault: true}]});
});

Meteor.publish('locations', function(cityId){
  return Locations.find({cityId});
});

Meteor.publish('artist-locations', function(locationIds) {
  return Locations.find({_id: {$in: locationIds}});
});

Meteor.publish('type-locations', function(categoryType) {
    return Locations.find({type: categoryType});
});

Meteor.publish('categories', function(){
  return Locations.find();
});

Meteor.publish('artists', function(){
  return Artists.find();
})

Meteor.publish('artist', function(id){
  return Artists.find({_id: id});
})

Meteor.publish('artist-name', function(name){
  return Artists.find({artistName: name});
})

Meteor.publish('artist-comments', function(artistId) {
  return ArtistComments.find({artistId: artistId});
})
