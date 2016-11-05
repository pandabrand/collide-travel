import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Geolocation } from 'meteor/mdg:geolocation';
var haversine = require('haversine');

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '/lib/collections/cities.js';
import { LocationsCollection } from '/lib/collections/locations.js';
import { ArtistsCollection } from '/lib/collections/artists.js';
import { ArtistCommentsCollection } from '/lib/collections/artist-comments.js';
import { AdZoneCollection } from '/lib/collections/ad-zone.js';
import { CityComponent } from '/imports/components/city/city.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';
import { Subs } from '/imports/containers/subs.js';
import {createMarkup, removeHTMLTags, cloudinaryURL} from '/lib/utils.js';

const getLocations = (id) => {
  const locations_sub = Subs.subscribe('city-id-locations',id);
  if(locations_sub.ready()) {
    return LocationsCollection.find({cityId: id}, {sort:{isFeatured: -1, name: 1}}).fetch();
  }
}

const getArtistLocations = (locationIds) => {
  const locations_sub = Subs.subscribe('artist-locations', locationIds);
  if(locations_sub.ready()) {
    return LocationsCollection.find({_id: {$in: locationIds}},{sort:{isFeatured: -1, name: 1}});
  }
}

const getArtistComments = (artistId) => {
  const ac_sub = Subs.subscribe('artist-comments', artistId);
  if(ac_sub.ready()) {
    return ArtistCommentsCollection.find({artistId: artistId}).fetch();
  }
}

const composeDataFromLocation = (position, props, onData) => {
  const subscription = Subs.subscribe('all-cities');
  if(subscription.ready()) {
    const cities = CitiesCollection.find({}).fetch();
    const start = {latitude: position.lat, longitude: position.lng};
    const sortedCities = _.sortBy(cities, function(city) {
      const end = {latitude: city.location.lat, longitude: city.location.lng};
      const _d = haversine(start, end, {unit: 'km'});
      return _d;
    });

    const city = sortedCities[0];
    return composeData(props, onData, city);
  }
}

 const composeDataFromURL = (props, onData) => {
   const subscription = Subs.subscribe('find-city',props.name);
   if(subscription.ready()) {
     const city = CitiesCollection.findOne({cityName:props.name});
     return composeData(props, onData, city);
   }
 }

const composeData = (props, onData, city) => {
  const limit = (typeof window !== 'undefined' && window.innerWidth <= 511) ? Session.get('mobileLimit') : 30;
  const artists_sub = Subs.subscribe('artists-city-by-name-image', city.cityName);
  const adSubscription = Subs.subscribe('get-ad');
  let homeCity = city;
  let locations = {};
  let artists = {};
  let artistComments = [];
  if(artists_sub.ready() && adSubscription.ready()) {
    artists = ArtistsCollection.find({cityName:city.cityName}, {sort:{isFeatured: -1, artistName: 1},limit:limit}).fetch();
    ads = AdZoneCollection.findOne({});

    const locations_sub = Subs.subscribe('city-id-locations', homeCity._id);
    if(locations_sub.ready()) {
        locations = LocationsCollection.find({cityId:homeCity._id}, {sort:{isFeatured: -1, name: 1}}).fetch();

        const artistIds = _.pluck(artists, '_id');
        const ac_sub = Subs.subscribe('artist-comments-by-artist', artistIds);
        if(ac_sub.ready()) {
          const artistsComments = ArtistCommentsCollection.find({artistId: {$in: artistIds}}).fetch();
          for(let x = 0; x < artists.length; x++) {
            const _comm = _.where(artistsComments, {artistId: artists[x]._id});
            for(let y = 0; y < _comm.length; y++) {
              artistComments.push(_comm[y]);
            }
          }

          const social_title = 'Collide Travel - ' + homeCity.displayName;
          const social_description = removeHTMLTags(homeCity.description).substring(0,154);
          const current_url = FlowRouter.current();
          const social_url = FlowRouter.url(current_url.route.path, current_url.params, {});
          const social_image = cloudinaryURL(homeCity.guidePreview, 600, 315, 'fill', 'auto', 2.0);

          const fb_url = {property:'og:url', content:social_url};
          const fb_title = {property:'og:title', content:social_title};
          const fb_description = {property:'og:description',content:social_description};
          const fb_image = {property:'og:image', content: social_image};
          const fb_type = {property:'og:type', content:'place'};
          const twitter_card = {name:'twitter:card', content:social_description};
          const twitter_title = {name:'twitter:title', content:social_title};
          const twitter_description = {name:'twitter:description', content:social_description};
          const twitter_url = {name:'twitter:url', content:social_url};
          const google_description = {name:'description', content:social_description};

          DocHead.setTitle(social_title);
          DocHead.addMeta(fb_type);
          DocHead.addMeta(fb_url);
          DocHead.addMeta(fb_title);
          DocHead.addMeta(fb_description);
          DocHead.addMeta(fb_image);
          DocHead.addMeta(twitter_card);
          DocHead.addMeta(twitter_title);
          DocHead.addMeta(twitter_description);
          DocHead.addMeta(twitter_url);
          DocHead.addMeta(google_description);
          return {homeCity, locations, artists, artistComments, ads, props}
        }
    }
  }
}

const composer = (props, onData) => {
  if(Meteor.isClient) {
    Session.setDefault('mobileLimit',6);
  }
  if(props.geolocation) {
    position = Geolocation.latLng();
    if(position) {
      props.geolocation[position];
      const homeData = composeDataFromLocation(position, props, onData);
      onData(null, homeData);
    }
  } else {
    const homeData = composeDataFromURL(props, onData);
    onData(null, homeData);
  }
};

function mapStateToProps(state) {
  return {
    markerCirlceHover: state.markerCirlceHover,
    mapTableHover: state.mapTableHover,
    mapTableRowClick: state.mapTableRowClick,
    artistExploreSelection: state.artistExploreSelection,
    categoryExploreSelection: state.categoryExploreSelection,
    mapLocationClick: state.mapLocationClick,
    mapPosition: state.mapPosition,
    mobileMapRowPosition: state.mobileMapRowPosition,
  }
}

export default CityContainer = connect(mapStateToProps)(composeWithTracker(composer,SpinnerComponent)(CityComponent));
