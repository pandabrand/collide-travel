import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { LocationsCollection } from '../../lib/collections/locations.js';
import { ArtistsCollection } from '../../lib/collections/artists.js';
import { ArtistCommentsCollection } from '../../lib/collections/artist-comments.js';

import { ArtistGuideComponent } from '../components/artist/artist.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('find-city',props.name);
  const artist_sub = Meteor.subscribe('artist-name', props.artistName);
  let homeCity = {};
  let locations = {};
  let artist = {};
  let artistComments = {};
  if(subscription.ready() && artist_sub.ready()) {
    homeCity = CitiesCollection.findOne({cityName:props.name});
    artist = ArtistsCollection.findOne({artistSlug:props.artistName});
    const locations_sub = Meteor.subscribe('artist-locations', artist.locationIds);
    if(locations_sub.ready()) {
        locations = LocationsCollection.find({_id: {$in: artist.locationIds}}).fetch();

        const comments_sub = Meteor.subscribe('artist-comments', artist._id);
        if (comments_sub.ready()) {
          artistComments = ArtistCommentsCollection.find({artistId: artist._id}).fetch();

          const homeData = {homeCity, locations, artist, artistComments, props}
          onData(null, homeData);
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
    mapLocationClick: state.mapLocationClick,
  }
}

export default ArtistGuideContainer = connect(mapStateToProps)(composeWithTracker(composer)(ArtistGuideComponent));
