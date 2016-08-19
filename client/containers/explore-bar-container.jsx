import React from 'react';
import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { LocationsCollection } from '../../lib/collections/locations.js';
import { ArtistsCollection } from '../../lib/collections/artists.js';
import  {ExploreBarComponent}  from '../components/includes/explore.jsx';

const composer = (props, onData) => {
  const citySubscription = Meteor.subscribe('cities');
  const cat_sub = Meteor.subscribe('categories');
  const art_sub = Meteor.subscribe('artists');

  if(citySubscription.ready() && cat_sub.ready() && art_sub.ready()) {
    const cities = CitiesCollection.find().fetch();

    const allLocationCategories = _.uniq(LocationsCollection.find({}, {sort: {type: 1}}).fetch(), false, function(l){return l.type});
    const locationCategories = _.pluck(allLocationCategories, 'type');

    const artists = ArtistsCollection.find().fetch();

    const cityData = {cities, locationCategories, artists, props}
    onData(null, cityData);
  }
};

export default ExploreBarContainer = composeWithTracker(composer, null, null, {pure:false})(ExploreBarComponent);
