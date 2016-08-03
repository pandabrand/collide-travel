import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { LocationsCollection } from '../../lib/collections/locations.js';
import { CategoryComponent } from '../components/categories/category.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('type-locations',props.type);
  if(subscription.ready()) {
    let homeCity = {};
    let locations = [];

    locations = LocationsCollection.find({type: props.type}).fetch();
    if(locations.length > 0) {
      const city_sub = Meteor.subscribe('find-city-id', locations[0].cityId);
      if(city_sub.ready()) {
        homeCity = CitiesCollection.findOne({_id:locations[0].cityId});
      }
    }

    const categoryData = {homeCity, locations, props}
    onData(null, categoryData);
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

export default CategoryContainer = connect(mapStateToProps)(composeWithTracker(composer)(CategoryComponent));
