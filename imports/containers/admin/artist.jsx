import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { ArtistsCollection } from '/lib/collections/artists.js';

import {ArtistTableComponent} from '/imports/components/admin/artist/artist-table.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const pagination = new Meteor.Pagination(ArtistsCollection);

const composer = (props, onData) => {
  const artists = pagination.getPage();
  if(pagination.ready()) {
    const artistData = {artists, pagination, props};
    onData(null, artistData);
  }
};

const AdminArtistContainer = composeWithTracker(composer, SpinnerComponent)(ArtistTableComponent);

export default connect()(AdminArtistContainer);
