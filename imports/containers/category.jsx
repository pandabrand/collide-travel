import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '/lib/collections/cities.js';
import { LocationsCollection } from '/lib/collections/locations.js';
import { ArtistsCollection } from '/lib/collections/artists.js';
import { ArtistCommentsCollection } from '/lib/collections/artist-comments.js';
import { CategoryComponent } from '/imports/components/categories/category.jsx';
import { AdZoneCollection } from '/lib/collections/ad-zone.js';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';
import { Subs } from '/imports/containers/subs.js';

const composer = (props, onData) => {

  const adSubscription = Subs.subscribe('get-ad');
  if(adSubscription.ready()) {
    let homeCity = {};
    let locations = [];
    let artists = [];
    let artistComments = [];

    ads = AdZoneCollection.findOne({});
    if(props.name) {
      subscription = Subs.subscribe('city-type-locations', props.type, props.name);
      if(subscription.ready()) {
        homeCity = CitiesCollection.findOne({cityName: props.name});
        locations = LocationsCollection.find({type: props.type, cityName: props.name}).fetch();
        if(locations.length > 0) {
          const locationIds =  _.pluck(locations, '_id');

          const artist_sub = Subs.subscribe('artist-by-location', locationIds);
          const comments_sub = Subs.subscribe('artist-comments-by-location',locationIds);
          if(artist_sub.ready() && comments_sub.ready()) {
            artists = ArtistsCollection.find({locationIds: {$in:locationIds}}).fetch();
            artistComments = ArtistCommentsCollection.find({locationId: {$in: locationIds}}).fetch();

            const categoryData = {homeCity, locations, artists, artistComments, ads, props}
            onData(null, categoryData);
          }
        }
      }

    } else {
      let subscription = Subs.subscribe('type-locations',props.type);
      if(subscription.ready()) {
        locations = LocationsCollection.find({type: props.type}).fetch();
        if(locations.length > 0) {

          const locationIds =  _.pluck(locations, '_id');

          const city_sub = Subs.subscribe('find-city-id', locations[0].cityId);
          const artist_sub = Subs.subscribe('artist-by-location', locationIds);
          const comments_sub = Subs.subscribe('artist-comments-by-location',locationIds);
          if(city_sub.ready() &&  artist_sub.ready() && comments_sub.ready()) {
            homeCity = CitiesCollection.findOne({_id:locations[0].cityId});
            artists = ArtistsCollection.find({locationIds: {$in:locationIds}}).fetch();
            artistComments = ArtistCommentsCollection.find({locationId: {$in: locationIds}}).fetch();

            const categoryData = {homeCity, locations, artists, artistComments, ads, props}
            onData(null, categoryData);
          }
        }
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
    categoryExploreSelection: state.categoryExploreSelection,
    mapPosition: state.mapPosition,
    mobileMapRowPosition: state.mobileMapRowPosition,
  }
}

export default CategoryContainer = connect(mapStateToProps)(composeWithTracker(composer, SpinnerComponent)(CategoryComponent));
