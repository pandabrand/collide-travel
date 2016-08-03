import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { LocationsCollection } from '../../lib/collections/locations.js';
import { ArtistsCollection } from '../../lib/collections/artists.js';
import { ExploreBarComponent } from '../components/includes/explore.jsx';

const composer = (props, onData) => {
  const citySubscription = Meteor.subscribe('cities');
  const locationCategorySubscription = Meteor.subscribe('categories');
  const artistSubscription = Meteor.subscribe('artists');
  if(citySubscription.ready() && locationCategorySubscription.ready() && artistSubscription.ready()) {
    const cities = CitiesCollection.find().fetch();

    const allLocationCategories = _.uniq(LocationsCollection.find({}, {sort: {type: 1}}).fetch(), false, function(l){return l.type});
    const locationCategories = _.pluck(allLocationCategories, 'type');

    const artists = ArtistsCollection.find().fetch();

    const cityData = {cities, locationCategories, artists, props}
    onData(null, cityData);
  }
};

const ExploreBarContainer = composeWithTracker(composer)(ExploreBarComponent);

export default connect()(ExploreBarContainer);
