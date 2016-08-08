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
  if(subscription.ready()) {
    let homeCity = {};
    let locations = [];
    let artist = {};
    let artistComments = [];
    homeCity = CitiesCollection.findOne({cityName:props.name});
    if(props.artistName) {
      const artist_sub = Meteor.subscribe('artist-name', props.artistName);
      if(artist_sub.ready()) {
        artist = ArtistsCollection.findOne({artistSlug:props.artistName});
        locations = getArtistLocations(artist.locationIds);
        artistComments = getArtistComments(artist._id);
      }
    } else {
      locations = getLocations(homeCity._id);
    }

    const homeData = {homeCity, locations, artist, artistComments, props}
    onData(null, homeData);
  }
};

function mapStateToProps(state) {
  return {
    markerCirlceHover: state.markerCirlceHover,
    mapTableHover: state.mapTableHover,
    mapTableRowClick: state.mapTableRowClick,
    artistExploreSelection: state.artistExploreSelection,
    categoryExploreSelection: state.categoryExploreSelection
  }
}

export default CityContainer = connect(mapStateToProps)(composeWithTracker(composer)(CityComponent));
