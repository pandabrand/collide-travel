import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { PagesCollection } from '../../lib/collections/pages.js';
import { HomeComponent } from '../components/home/home.jsx';


const composer = (props, onData) => {
  const subscription = Meteor.subscribe('featured-cities');
  const homePage_sub = Meteor.subscribe('home-page', true);
  if(subscription.ready() && homePage_sub.ready()) {
    featuredCities = CitiesCollection.find({isFeatured:true},{skip:0,limit:4}).fetch();

    homePage = PagesCollection.findOne({isHome: true});

    const homeData = {homePage, featuredCities, props}
    onData(null, homeData);
  }
};

function mapStateToProps(state) {
  return {
    markerCirlceHover: state.markerCirlceHover,
    mapTableHover: state.mapTableHover,
    mapTableRowClick: state.mapTableRowClick,
    cityExploreSelection: state.cityExploreSelection,
    artistExploreSelection: state.artistExploreSelection,
    categoryExploreSelection: state.categoryExploreSelection
  }
}


export default HomeContainer = connect(mapStateToProps)(composeWithTracker(composer)(HomeComponent));
