import React from 'react';
import ReactDOM from 'react-dom';

import { composeWithTracker } from 'react-komposer';
import { Cities } from '../../lib/collections/cities.js';
import { HomeCity } from '../components/home/google-maps.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('promoted-city');
  if(subscription.ready()) {
    let homeCity = Cities.findOne({isPromoted:true});
    if(!homeCity) {
      homeCity = Cities.findOne({isDefault:true});
    }
    onData(null, {homeCity});
  }
};

export default HomeCityContainer = composeWithTracker(composer)(HomeCity);
