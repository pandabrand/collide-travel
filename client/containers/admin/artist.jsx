import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { ArtistsCollection } from '../../../lib/collections/artists.js';

import {ArtistTableComponent} from '../../components/admin/artist/artist-table.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('artists');
  if(subscription.ready()) {
    const artists = ArtistsCollection.find().fetch();
    const artistData = {artists, props};
    onData(null, artistData);
  }
};

const AdminArtistContainer = composeWithTracker(composer)(ArtistTableComponent);

export default connect()(AdminArtistContainer);
