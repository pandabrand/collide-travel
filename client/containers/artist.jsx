import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { LocationsCollection } from '../../lib/collections/locations.js';
import { ArtistsCollection } from '../../lib/collections/artists.js';
import { ArtistCommentsCollection } from '../../lib/collections/artist-comments.js';
import { AdZoneCollection } from '../../lib/collections/ad-zone.js';
import { ArtistGuideComponent } from '../components/artist/artist.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('find-city',props.name);
  const artist_sub = Meteor.subscribe('artist-name', props.artistName);
  const adSubscription = Meteor.subscribe('get-ad');
  let homeCity = {};
  let locations = {};
  let artist = {};
  let artistComments = {};
  let relatedArtists = [];

  if(subscription.ready() && artist_sub.ready() && adSubscription.ready()) {
    homeCity = CitiesCollection.findOne({cityName:props.name});
    artist = ArtistsCollection.findOne({artistSlug:props.artistName});
    ads = AdZoneCollection.findOne({});
    const locations_sub = Meteor.subscribe('artist-locations', artist.locationIds);
    if(locations_sub.ready()) {
        locations = LocationsCollection.find({_id: {$in: artist.locationIds}}).fetch();

        const comments_sub = Meteor.subscribe('artist-comments', artist._id);
        const related_sub = Meteor.subscribe('artist-related', artist._id);

        if (comments_sub.ready() && related_sub.ready()) {
          artistComments = ArtistCommentsCollection.find({artistId: artist._id}).fetch();
          relatedArtists = ArtistsCollection.find({ _id: { $nin: [artist._id] }, cityId: artist.cityId },{limit:3}).fetch();

          const homeData = {homeCity, locations, artist, artistComments, relatedArtists, ads, props}
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
