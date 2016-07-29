import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { Cities } from '../../lib/collections/cities.js';
import { Locations } from '../../lib/collections/locations.js';
import { Artists } from '../../lib/collections/artists.js';
import { ExploreBar } from '../components/includes/explore.jsx';

const composer = (props, onData) => {
  const citySubscription = Meteor.subscribe('cities');
  const locationCategorySubscription = Meteor.subscribe('categories');
  const artistSubscription = Meteor.subscribe('artists');
  if(citySubscription.ready() && locationCategorySubscription.ready() && artistSubscription.ready()) {
    const cities = Cities.find().fetch();

    const allLocationCategories = _.uniq(Locations.find({}, {sort: {type: 1}}).fetch(), false, function(l){return l.type});
    const locationCategories = _.pluck(allLocationCategories, 'type');

    const artists = Artists.find().fetch();

    const cityData = {cities, locationCategories, artists, props}
    onData(null, cityData);
  }
};

const ExploreBarContainer = composeWithTracker(composer)(ExploreBar);

export default connect()(ExploreBarContainer);
