import React from 'react';
import ReactDOM from 'react-dom';

import { composeWithTracker } from 'react-komposer';
import { Cities } from '../../lib/collections/cities.js';
import { Locations } from '../../lib/collections/locations.js';
import { Artists } from '../../lib/collections/artists.js';
import { HomeCity } from '../components/home/google-maps.jsx';

const getLocations = (id) => {
  const locations_sub = Meteor.subscribe('locations',id);
  if(locations_sub.ready()) {
    return Locations.find({cityId: id}).fetch();
  }
}
const getCity = (q) => {
  return Cities.findOne(q);
}

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('promoted-city');
  if(subscription.ready()) {
    let homeCity = {};
    let locations = [];
    let artist = {};
    
    if(props.cityExploreSelection !== '0') {
      homeCity = getCity({_id:props.cityExploreSelection});
      locations = getLocations(homeCity._id);
    } if(props.artistExploreSelection !== '0') {
      const artistSubscription = Meteor.subscribe('artist', props.artistExploreSelection);
      if(artistSubscription.ready()) {
        artist = Artists.findOne({_id: props.artistExploreSelection});
        const artistCitySubscription = Meteor.subscribe('artist-locations', artist.locationIds);
        if(artistCitySubscription.ready()) {
          locations = Locations.find({_id: {$in: artist.locationIds}}).fetch();
        }
        homeCity = getCity({_id:artist.cityId});
      }
    } if(props.categoryExploreSelection !== 'NO_TYPE') {
      cityid = '';
      const typeLocationsSubscription = Meteor.subscribe('type-locations',props.categoryExploreSelection);
      if(typeLocationsSubscription.ready()) {
        locations = Locations.find({type:props.categoryExploreSelection}).fetch();
        cityid = locations[0].cityId;
      }
      homeCity = getCity({_id: cityid});
    } else {
      homeCity = getCity({isPromoted:true});
      if(!homeCity) {
        homeCity = getCity({isDefault:true});
      }
      locations = getLocations(homeCity._id);
    }


    const homeData = {homeCity, locations, props}
    onData(null, homeData);
  }
};

export default HomeCityContainer = composeWithTracker(composer)(HomeCity);
