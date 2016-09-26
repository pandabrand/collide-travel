import { CitiesCollection } from '../lib/collections/cities.js';
import { MagazinesCollection } from '../lib/collections/magazines.js';
import { LocationsCollection } from '../lib/collections/locations.js';
import { ArtistsCollection } from '../lib/collections/artists.js';
import { ArtistCommentsCollection } from '../lib/collections/artist-comments.js';
import { EventsCollection } from '../lib/collections/events.js';
import { PagesCollection } from '../lib/collections/pages.js';
import { AdZoneCollection } from '../lib/collections/ad-zone.js';
let haversine = require('haversine');

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

Meteor.publish('explore-cities', function() {
  return CitiesCollection.find({},{fields: {cityName:1,displayName:1,isPromoted:1}});
});

Meteor.publish('city-guides', function() {
  return CitiesCollection.find({showPrintGuide:true});
});

Meteor.publish('featured-cities', function() {
  return CitiesCollection.find({isFeatured:true},{skip:0, limit: 6, fields:{displayName:1,printPreview:1,cityName:1}});
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
  return CitiesCollection.find({isPromoted: true}, {fields:{displayName:1,isPromoted:1,cityName:1}});
});

Meteor.publish('locations', function(cityId){
  check(cityId, String);
  return LocationsCollection.find({cityId:cityId},{sort:{isFeatured: -1, name: 1}});
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

Meteor.publish('city-type-locations', function(categoryType, cityName) {
  check(categoryType, String);
  check(cityName, String);
  return [CitiesCollection.find({cityName:cityName}), LocationsCollection.find({type: categoryType, cityName: cityName})];
});

Meteor.publish('categories', function(){
  return LocationsCollection.find();
});

Meteor.publish('explore-categories', function(){
  return LocationsCollection.find({},{fields:{type:1,name:1,cityName:1}});
});

Meteor.publish('artists', function(){
  return ArtistsCollection.find();
})

Meteor.publish('explore-artists', function(){
  return ArtistsCollection.find({},{fields:{cityName:1,artistSlug:1,artistName:1,isFeatured:1}});
})


Meteor.publish('artist', function(id){
  check(id, String);
  return ArtistsCollection.find({_id: id});
})

Meteor.publish('artists-city-by-name', function(cityName) {
    check(cityName, String);
    return ArtistsCollection.find({cityName:cityName},{fields:{artistName:1,cityName:1,artistSlug:1,locationIds:1,isFeatured:1,color:1}});
})

Meteor.publish('artists-city-by-name-image', function(cityName) {
    check(cityName, String);
    return ArtistsCollection.find({cityName:cityName},{fields:{artistName:1,cityName:1,artistSlug:1,locationIds:1,isFeatured:1,color:1,image:1}});
})

Meteor.publish('artist-name', function(name){
  check(name, String);
  return ArtistsCollection.find({artistSlug:name});
})

Meteor.publish('artist-by-location', function(locationIds){
  check(locationIds, [String]);
  return ArtistsCollection.find({locationIds:{$in: locationIds}});
})

Meteor.publish('artist-related', function(artistId){
  check(artistId, String);
  return ArtistsCollection.find({ _id: { $nin: [artistId] } },{limit:3,fields:{artistSlug:1,artistName:1,image:1,cityName:1,cityId:1}});
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

Meteor.publish('page-by-title', function(title) {
  check(title, String);
  return PagesCollection.find({title:title});
});

Meteor.publish('edit-user', function(usrnm) {
  check(usrnm, String);
 return Meteor.users.find({'username':usrnm});
});

Meteor.publish('user-list', function (){
  return Meteor.users.find({});
});

Meteor.publish('get-ad', function(){
  return AdZoneCollection.find({});
});

Meteor.publish('magazines', function() {
  return MagazinesCollection.find();
});

Meteor.publish('edit-magazine', function(magazineId) {
  check(magazineId, String);
  return MagazinesCollection.find({_id: magazineId});
})

Meteor.publish('search', function(searchTerm) {
  check(searchTerm, Match.OneOf( String, null, undefined ));
  let regex = new RegExp(searchTerm, 'i'),
  projection = {limit: 10};
  if(searchTerm) {
    const cityQuery = {$or:[{displayName:regex},{description:regex}]};
    const artistQuery = {$or:[{artistName:regex},{description:regex},{cityName:regex}]};
    const locationQuery = {$or:[{name:regex},{description:regex},{address:regex}]};
    return [
      CitiesCollection.find(cityQuery, {limit:10,fields:{displayName:1,description:1,cityName:1}}),
      ArtistsCollection.find(artistQuery, {limit:10,fields:{artistName:1,description:1,cityName:1,cityId:1,artistSlug:1}}),
      LocationsCollection.find(locationQuery, {limit:10,fields:{name:1,description:1,address:1,cityId:1}}),
    ];
  }
})
