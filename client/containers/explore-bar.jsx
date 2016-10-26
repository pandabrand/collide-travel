import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '/lib/collections/cities.js';
import { LocationsCollection } from '/lib/collections/locations.js';
import { ArtistsCollection } from '/lib/collections/artists.js';
import { ExploreBarComponent } from '/imports/components/includes/explore.jsx';

const ExploreBarContainer = createContainer(({}) => {
  const citySubscription = Meteor.subscribe('all-cities');
  const loading = !citySubscription.ready();
  const cities = CitiesCollection.find({}).fetch();
  const citiesExist = !loading && !!cities;

  return {loading, cities, citiesExist, cities: citiesExist ? cities : [],};
}, ExploreBarComponent);

export default connect(({}) => ({}))(ExploreBarContainer);
