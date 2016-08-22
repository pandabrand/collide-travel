import { CitiesCollection } from '../lib/collections/cities.js';
import { LocationsCollection } from '../lib/collections/locations.js';
import { ArtistsCollection } from '../lib/collections/artists.js';
import { ArtistCommentsCollection } from '../lib/collections/artist-comments.js';
import { EventsCollection } from '../lib/collections/events.js';
import { PagesCollection } from '../lib/collections/pages.js';
import { TrendingCollections } from '../lib/collections/trending.js';

Meteor.publish('everything', function() {
    return [
      CitiesCollection.find({}),
      LocationsCollection.find({}),
      ArtistsCollection.find({}),
      EventsCollection.find({}),
      PagesCollection.find({}),
      Meteor.users.find(),
    ];
});

Meteor.publish('event', function(id) {
  check(id, String);
  return EventsCollection.find({_id:id});
});

Meteor.publish('cities', function() {
  return CitiesCollection.find();
});

Meteor.publish('featured-cities', function() {
  return CitiesCollection.find({isFeatured:true},{skip:0, limit: 4});
});

Meteor.publish('find-city', function(cityName) {
  check(cityName, String);
  cities = CitiesCollection.find({cityName:cityName});
  return cities;
});

Meteor.publish('find-city-id', function(id) {
  check(id, String);
  cities = CitiesCollection.find({_id:id});
  return cities;
});

Meteor.publish('promoted-city', function() {
  return CitiesCollection.find({isPromoted: true});
});

Meteor.publish('locations', function(cityId){
  check(cityId, String);
  return LocationsCollection.find({cityId:cityId});
});

Meteor.publish('all-locations', function(){
  return LocationsCollection.find({});
});

Meteor.publish('location', function(locationId){
  check(locationId, String);
  return LocationsCollection.find({_id:locationId});
});

Meteor.publish('artist-locations', function(locationIds) {
  check(locationIds, [String]);

  return LocationsCollection.find({_id: {$in: locationIds}});
});

Meteor.publish('type-locations', function(categoryType) {
  check(categoryType, String);
    return LocationsCollection.find({type: categoryType});
});

Meteor.publish('categories', function(){
  return LocationsCollection.find();
});

Meteor.publish('artists', function(){
  return ArtistsCollection.find();
})

Meteor.publish('artist', function(id){
  check(id, String);
  return ArtistsCollection.find({_id: id});
})

Meteor.publish('artists-city-by-name', function(cityName) {
    check(cityName, String);
    return ArtistsCollection.find({cityName:cityName});
})

Meteor.publish('artist-name', function(name){
  check(name, String);
  return ArtistsCollection.find({artistSlug:name});
})

Meteor.publish('artist-by-location', function(locationIds){
  check(locationIds, [String]);
  return ArtistsCollection.find({locationIds:{$in: locationIds}});
})

Meteor.publish('artist-comments-by-location', function(locationIds) {
  check(locationIds, [String]);
  return ArtistCommentsCollection.find({locationId: {$in: locationIds}});
})

Meteor.publish('artist-comments', function(artistId) {
  check(artistId, String);
  return ArtistCommentsCollection.find({artistId: artistId});
})

Meteor.publish('all-artist-comments', function() {
  return ArtistCommentsCollection.find({});
})

Meteor.publish('artist-comments-edit', function(artistId) {
  check(artistId, String);
  return [
    ArtistCommentsCollection.find({artistId: artistId}),
    ArtistsCollection.find({_id:artistId}),
    LocationsCollection.find(),
  ];
})


Meteor.publish('admin-events', function() {
  return EventsCollection.find({});
})

Meteor.publish('edit-event', function(eventId) {
  check(eventId, String);
  return EventsCollection.find({_id: eventId});
})

Meteor.publish('edit-city', function(cityId) {
  check(cityId, String);
  return CitiesCollection.find({_id: cityId});
})

Meteor.publish('pages', function() {
  return PagesCollection.find();
});

Meteor.publish('page', function(pageId) {
  check(pageId, String);
  return PagesCollection.find({_id:pageId});
});

Meteor.publish('home-page', function(isHome) {
  check(isHome, Boolean);
  return PagesCollection.find({isHome:isHome});
});

Meteor.publish('edit-user', function(usrnm) {
  check(usrnm, String);
 return Meteor.users.find({'username':usrnm});
});

Meteor.publish('user-list', function (){
  return Meteor.users.find({});
});

Meteor.publish('trending', function() {
  Meteor.call('get.feed', function(err, result){
    if(err){
      console.err('Something went wrong getting the feed from CC.');
    }
  })
  return TrendingCollections.find({},{sort:{date:-1},limit:3});
});
