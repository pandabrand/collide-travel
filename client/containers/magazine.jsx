import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { MagazinesCollection } from '../../lib/collections/magazines.js';
import { AdZoneCollection } from '../../lib/collections/ad-zone.js';
import { PagesCollection } from '../../lib/collections/pages.js';
import { subs } from '../main.js';

import  PrintPageComponent  from '../components/print-page/print-page.jsx';
import SpinnerComponent from '../components/includes/spinner.jsx';

const composer = (props, onData) => {
  const citySubscription = subs.subscribe('city-guides');
  const magazineSubscription = subs.subscribe('magazines');
  const adSubscription = subs.subscribe('get-ad');
  const pageSubscription = subs.subscribe('page-by-title','City Guides');
  if(citySubscription.ready() && magazineSubscription.ready() && adSubscription.ready() && pageSubscription.ready()) {
    cities = CitiesCollection.find({showPrintGuide:true},{sort:{isFeature: -1, displayName: 1}});
    magazines = MagazinesCollection.find({showPrintGuide:true});
    ads = AdZoneCollection.findOne({});
    page = PagesCollection.findOne({title:'City Guides'});
    const cityData = {cities, magazines, ads, page, props}
    onData(null, cityData);
  }
};

export default composeWithTracker(composer, SpinnerComponent)(PrintPageComponent);
