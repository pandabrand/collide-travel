import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Geolocation } from 'meteor/mdg:geolocation';
var haversine = require('haversine');

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { LocationsCollection } from '../../lib/collections/locations.js';
import { ArtistsCollection } from '../../lib/collections/artists.js';
import { ArtistCommentsCollection } from '../../lib/collections/artist-comments.js';
import { AdZoneCollection } from '../../lib/collections/ad-zone.js';
import { CityComponent } from '../components/city/city.jsx';
import SpinnerComponent from '../components/includes/spinner.jsx';
import { subs } from '../main.js';

const getLocations = (id) => {
  const locations_sub = subs.subscribe('locations',id);
  if(locations_sub.ready()) {
    return LocationsCollection.find({cityId: id}, {sort:{isFeatured: -1, name: 1}}).fetch();
  }
}

const getArtistLocations = (locationIds) => {
  const locations_sub = subs.subscribe('artist-locations', locationIds);
  if(locations_sub.ready()) {
    return LocationsCollection.find({_id: {$in: locationIds}},{sort:{isFeatured: -1, name: 1}});
  }
}

const getArtistComments = (artistId) => {
  const ac_sub = subs.subscribe('artist-comments', artistId);
  if(ac_sub.ready()) {
    return ArtistCommentsCollection.find({artistId: artistId}).fetch();
  }
}

const composeDataFromLocation = (position, props, onData) => {
  const subscription = subs.subscribe('cities');
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
   const subscription = subs.subscribe('find-city',props.name);
   if(subscription.ready()) {
     const city = CitiesCollection.findOne({cityName:props.name});
     return composeData(props, onData, city);
   }
 }

const composeData = (props, onData, city) => {
  const limit = window.innerWidth <= 511 ? Session.get('mobileLimit') : 30;
  const artists_sub = subs.subscribe('artists-city-by-name-image', city.cityName);
  const adSubscription = subs.subscribe('get-ad');
  let homeCity = city;
  let locations = {};
  let artists = {};
  let artistComments = [];
  if(artists_sub.ready() && adSubscription.ready()) {
    artists = ArtistsCollection.find({cityName:city.cityName}, {sort:{isFeatured: -1, artistName: 1},limit:limit}).fetch();
    ads = AdZoneCollection.findOne({});

    const locations_sub = subs.subscribe('locations', homeCity._id);
    if(locations_sub.ready()) {
        locations = LocationsCollection.find({cityId:homeCity._id}, {sort:{isFeatured: -1, name: 1}}).fetch();

        const ac_sub = subs.subscribe('all-artist-comments');
        if(ac_sub.ready()) {
          for(let x = 0; x < artists.length; x++) {
            const _comm = ArtistCommentsCollection.find({artistId: artists[x]._id}).fetch();
            for(let y = 0; y < _comm.length; y++) {
              artistComments.push(_comm[y]);
            }
          }

          return {homeCity, locations, artists, artistComments, ads, props}
        }
    }
  }
}

const composer = (props, onData) => {
  Session.setDefault('mobileLimit',6);
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
