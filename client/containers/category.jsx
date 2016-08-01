import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { Cities } from '../../lib/collections/cities.js';
import { Locations } from '../../lib/collections/locations.js';
import { Category } from '../components/categories/category.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('type-locations',props.type);
  if(subscription.ready()) {
    let homeCity = {};
    let locations = [];

    locations = Locations.find({type: props.type}).fetch();
    if(locations.length > 0) {
      const city_sub = Meteor.subscribe('find-city-id', locations[0].cityId);
      if(city_sub.ready()) {
        homeCity = Cities.findOne({_id:locations[0].cityId});
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

export default CategoryContainer = connect(mapStateToProps)(composeWithTracker(composer)(Category));
