import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import SpinnerComponent from '../components/includes/spinner.jsx';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { LocationsCollection } from '../../lib/collections/locations.js';
import { ArtistsCollection } from '../../lib/collections/artists.js';
import { ArtistCommentsCollection } from '../../lib/collections/artist-comments.js';
import SearchComponent from '../components/search/search.jsx';

const composer = (props, onData) => {
  const searchTerm = props.search;
  const searchSubscription = Meteor.subscribe('search', searchTerm);
  if(searchSubscription.ready()) {
    let regex = new RegExp(searchTerm, 'i'),
    projection = {limit: 10};
    const cityQuery = {$or:[{displayName:regex},{description:regex}]};
    const artistQuery = {$or:[{artistName:regex},{description:regex},{cityName:regex}]};
    const locationQuery = {$or:[{name:regex},{description:regex},{address:regex}]};

    const cityResults = CitiesCollection.find(cityQuery, {limit:10,sort:{displayName:1},fields:{displayName:1,description:1,cityName:1}}).fetch();
    const artistResults = ArtistsCollection.find(artistQuery, {limit:10,sort:{artistName:1},fields:{artistName:1,description:1,cityName:1,cityId:1,artistSlug:1}}).fetch();
    const locationResults = LocationsCollection.find(locationQuery, {limit:10,sort:{name:1},fields:{name:1,description:1,address:1,cityId:1}}).fetch();

    const searchData = {cityResults, artistResults, locationResults, props};
    onData(null, searchData);
  }
}

export default SearchContainer = composeWithTracker(composer, SpinnerComponent)(SearchComponent);
