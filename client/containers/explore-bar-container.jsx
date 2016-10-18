import React from 'react';
import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { LocationsCollection } from '../../lib/collections/locations.js';
import { ArtistsCollection } from '../../lib/collections/artists.js';
import  {ExploreBarComponent}  from '../components/includes/explore.jsx';
import SpinnerComponent from '../components/includes/spinner.jsx';
import { subs } from './subs.js';

const composer = (props, onData) => {
  const citySubscription = subs.subscribe('explore-cities');
  const cat_sub = subs.subscribe('explore-categories');
  const art_sub = subs.subscribe('explore-artists');

  if(citySubscription.ready() && cat_sub.ready() && art_sub.ready()) {
    const cities = CitiesCollection.find({},{sort:{isPromoted: -1, isFeatured: -1, displayName: 1},fields: {cityName:1,displayName:1,isPromoted:1}}).fetch();

    const locations = LocationsCollection.find({}, {sort: {type: 1},fields:{type:1,name:1,cityName:1}}).fetch();
    let locationCategories = _.uniq(locations, false, function(l){return l.type});
    locationCategories.map(function(category) {
      citiesToUnique = _.where(locations, {type:category.type});
      uniqueCities = _.uniq(citiesToUnique, false, function(c){return c.cityName});
      category['cityNames'] = _.pluck(uniqueCities, 'cityName');
    });

    // const locationCategories = _.pluck(allLocationCategories, 'type');

    const artists = ArtistsCollection.find({},{sort: {isFeatured: -1, artistName: 1},fields:{cityName:1,artistSlug:1,artistName:1,isFeatured:1}}).fetch();

    const cityData = {cities, locationCategories, artists, props}
    onData(null, cityData);
  }
};

export default ExploreBarContainer = composeWithTracker(composer, SpinnerComponent, null, {pure:false})(ExploreBarComponent);
