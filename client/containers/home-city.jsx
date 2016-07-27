import React from 'react';
import ReactDOM from 'react-dom';

import { composeWithTracker } from 'react-komposer';
import { Cities } from '../../lib/collections/cities.js';
import { Locations } from '../../lib/collections/locations.js';
import { HomeCity } from '../components/home/google-maps.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('promoted-city');
  if(subscription.ready()) {
    let homeCity = Cities.findOne({isPromoted:true});
    let locations = '';
    if(!homeCity) {
      homeCity = Cities.findOne({isDefault:true});
    }
    const locations_sub = Meteor.subscribe('locations',homeCity._id);
    if(locations_sub.ready()) {
      locations = Locations.find().fetch();
    }
    const homeData = {homeCity, locations, props}
    onData(null, homeData);
  }
};

export default HomeCityContainer = composeWithTracker(composer)(HomeCity);
