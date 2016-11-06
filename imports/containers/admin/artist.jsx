import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { ArtistsCollection } from '/lib/collections/artists.js';

import {ArtistTableComponent} from '/imports/components/admin/artist/artist-table.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';
import { Subs } from '/imports/containers/subs.js';

const pagination = new Meteor.Pagination(ArtistsCollection);

const composer = (props, onData) => {
  const artists = pagination.getPage();
  const subscription = Subs.subscribe('artists-text-search');
  if(pagination.ready() && subscription.ready()) {
    const textSearchArtists = ArtistsCollection.find({},{fields:{artistName:1},sort:{artistName:1}}).fetch();
    const artistData = {artists, pagination, textSearchArtists, props};
    onData(null, artistData);
  }
};

const AdminArtistContainer = composeWithTracker(composer, SpinnerComponent)(ArtistTableComponent);

export default connect()(AdminArtistContainer);
