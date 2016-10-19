import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { ArtistsCollection } from '/lib/collections/artists.js';

import {ArtistTableComponent} from '/imports/components/admin/artist/artist-table.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('artists');
  if(subscription.ready()) {
    const artists = ArtistsCollection.find().fetch();
    const artistData = {artists, props};
    onData(null, artistData);
  }
};

const AdminArtistContainer = composeWithTracker(composer, SpinnerComponent)(ArtistTableComponent);

export default connect()(AdminArtistContainer);
