import { CitiesCollection } from '../lib/collections/cities.js';
import { LocationsCollection } from '../lib/collections/locations.js';
import { ArtistsCollection } from '../lib/collections/artists.js';
import { ArtistCommentsCollection } from '../lib/collections/artist-comments.js';
import { EventsCollection } from '../lib/collections/events.js';

Meteor.publish('cities', function() {
  return CitiesCollection.find();
});

Meteor.publish('find-city', function(cityName) {
  cities = CitiesCollection.find({cityName:cityName});
  return cities;
});

Meteor.publish('find-city-id', function(id) {
  cities = CitiesCollection.find({_id:id});
  return cities;
});

Meteor.publish('promoted-city', function() {
  return CitiesCollection.find({$or: [{isPromoted: true},{isDefault: true}]});
});

Meteor.publish('locations', function(cityId){
  return LocationsCollection.find({cityId});
});

Meteor.publish('all-locations', function(){
  return LocationsCollection.find({});
});

Meteor.publish('location', function(locationId){
  return LocationsCollection.find({_id:locationId});
});

Meteor.publish('artist-locations', function(locationIds) {
  return LocationsCollection.find({_id: {$in: locationIds}});
});

Meteor.publish('type-locations', function(categoryType) {
    return LocationsCollection.find({type: categoryType});
});

Meteor.publish('categories', function(){
  return LocationsCollection.find();
});

Meteor.publish('artists', function(){
  return ArtistsCollection.find();
})

Meteor.publish('artist', function(id){
  return ArtistsCollection.find({_id: id});
})

Meteor.publish('artist-name', function(name){
  return ArtistsCollection.find({artistName: name});
})

Meteor.publish('artist-comments', function(artistId) {
  return ArtistCommentsCollection.find({artistId: artistId});
})

Meteor.publish('admin-events', function() {
  return EventsCollection.find({});
})

Meteor.publish('edit-event', function(eventId) {
  return EventsCollection.find({_id: eventId});
})

Meteor.publish('edit-city', function(cityId) {
  return CitiesCollection.find({_id: cityId});
})
