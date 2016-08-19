import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { LocationsCollection } from '../../lib/collections/locations.js';
import { ArtistsCollection } from '../../lib/collections/artists.js';
import { ArtistCommentsCollection } from '../../lib/collections/artist-comments.js';
import { CategoryComponent } from '../components/categories/category.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('type-locations',props.type);
  if(subscription.ready()) {
    let homeCity = {};
    let locations = [];
    let artists = [];
    let artistComments = [];

    locations = LocationsCollection.find({type: props.type}).fetch();
    if(locations.length > 0) {
      console.dir('found locations...');
      const locationIds =  _.pluck(locations, '_id');
      console.dir(locationIds);

      const city_sub = Meteor.subscribe('find-city-id', locations[0].cityId);
      const artist_sub = Meteor.subscribe('artist-by-location', locationIds);
      const comments_sub = Meteor.subscribe('artist-comments-by-location',locationIds);
      if(city_sub.ready() &&  artist_sub.ready() && comments_sub.ready()) {
        console.log('sub subs are ready...')
        homeCity = CitiesCollection.findOne({_id:locations[0].cityId});
        artists = ArtistsCollection.find({locationIds: {$in:locationIds}});
        artistComments = ArtistCommentsCollection.find({locationId: {$in: locationIds}});

        console.dir(artistComments);
        const categoryData = {homeCity, locations, artists, artistComments, props}
        onData(null, categoryData);
      }
    }

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
