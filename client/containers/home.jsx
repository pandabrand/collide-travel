import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { LocationsCollection } from '../../lib/collections/locations.js';
import { ArtistsCollection } from '../../lib/collections/artists.js';
import { HomeComponent } from '../components/home/home.jsx';

const getLocations = (id) => {
  const locations_sub = Meteor.subscribe('locations',id);
  if(locations_sub.ready()) {
    return LocationsCollection.find({cityId: id}).fetch();
  }
}
const getCity = (q) => {
  return CitiesCollection.findOne(q);
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
        artist = ArtistsCollection.findOne({_id: props.artistExploreSelection});
        const artistCitySubscription = Meteor.subscribe('artist-locations', artist.locationIds);
        if(artistCitySubscription.ready()) {
          locations = LocationsCollection.find({_id: {$in: artist.locationIds}}).fetch();
        }
        homeCity = getCity({_id:artist.cityId});
      }
    } if(props.categoryExploreSelection !== 'NO_TYPE') {
      cityid = '';
      const typeLocationsSubscription = Meteor.subscribe('type-locations',props.categoryExploreSelection);
      if(typeLocationsSubscription.ready()) {
        locations = LocationsCollection.find({type:props.categoryExploreSelection}).fetch();
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

function mapStateToProps(state) {
  return {
    markerCirlceHover: state.markerCirlceHover,
    mapTableHover: state.mapTableHover,
    mapTableRowClick: state.mapTableRowClick,
    cityExploreSelection: state.cityExploreSelection,
    artistExploreSelection: state.artistExploreSelection,
    categoryExploreSelection: state.categoryExploreSelection
  }
}


export default HomeContainer = connect(mapStateToProps)(composeWithTracker(composer)(HomeComponent));
