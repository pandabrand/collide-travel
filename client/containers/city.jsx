import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { LocationsCollection } from '../../lib/collections/locations.js';
import { ArtistsCollection } from '../../lib/collections/artists.js';
import { ArtistCommentsCollection } from '../../lib/collections/artist-comments.js';

import { CityComponent } from '../components/city/city.jsx';

const getLocations = (id) => {
  const locations_sub = Meteor.subscribe('locations',id);
  if(locations_sub.ready()) {
    return LocationsCollection.find({cityId: id}).fetch();
  }
}

const getArtistLocations = (locationIds) => {
  const locations_sub = Meteor.subscribe('artist-locations', locationIds);
  if(locations_sub.ready()) {
    return LocationsCollection.find({_id: {$in: locationIds}});
  }
}

const getArtistComments = (artistId) => {
  const ac_sub = Meteor.subscribe('artist-comments', artistId);
  if(ac_sub.ready()) {
    return ArtistCommentsCollection.find({artistId: artistId}).fetch();
  }
}

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('find-city',props.name);
  const artists_sub = Meteor.subscribe('artists-city-by-name', props.name);
  let homeCity = {};
  let locations = {};
  let artists = {};
  let artistComments = [];
  if(subscription.ready() && artists_sub.ready()) {
    homeCity = CitiesCollection.findOne({cityName:props.name});
    artists = ArtistsCollection.find({cityName:props.name});

    const locations_sub = Meteor.subscribe('locations', homeCity._id);
    if(locations_sub.ready()) {
        locations = LocationsCollection.find({cityId:homeCity._id}).fetch();

        const homeData = {homeCity, locations, artists, props}
        onData(null, homeData);
    }
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
  }
}

export default CityContainer = connect(mapStateToProps)(composeWithTracker(composer)(CityComponent));
