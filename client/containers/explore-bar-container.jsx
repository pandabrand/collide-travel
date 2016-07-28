import React from 'react';
import ReactDOM from 'react-dom';

import { composeWithTracker } from 'react-komposer';
import { Cities } from '../../lib/collections/cities.js';
import { Locations } from '../../lib/collections/locations.js';
import { ExploreBar } from '../components/includes/explore.jsx';

const composer = (props, onData) => {
  const citySubscription = Meteor.subscribe('cities');
  const locationCategorySubscription = Meteor.subscribe('categories');
  if(citySubscription.ready() && locationCategorySubscription.ready()) {
    const cities = Cities.find().fetch();
    const allLocationCategories = _.uniq(Locations.find({}, {sort: {type: 1}}).fetch(), false, function(l){return l.type});
    const locationCategories = _.pluck(allLocationCategories, 'type');
    const cityData = {cities, locationCategories, props}
    onData(null, cityData);
  }
};

export default ExploreBarContainer = composeWithTracker(composer)(ExploreBar);
