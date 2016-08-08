import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { ArtistsCollection } from '../../../lib/collections/artists.js';
import { CitiesCollection } from '../../../lib/collections/cities.js';
import { LocationsCollection } from '../../../lib/collections/locations.js';
import { EventsCollection } from '../../../lib/collections/events.js';
import { PagesCollection } from '../../../lib/collections/pages.js';

import {OverviewTableComponent} from '../../components/admin/overview.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('everything');
  if(subscription.ready()) {
    const artists = ArtistsCollection.find({},{artistsName:1}).fetch();
    const cities = CitiesCollection.find({},{cityName:1}).fetch();
    const locations = LocationsCollection.find({},{name:1}).fetch();
    const events = EventsCollection.find().fetch({},{title:1});
    const pages = PagesCollection.find({},{title:1}).fetch();
    const allData = {artists,cities,locations,events,pages,props};
    onData(null, allData);
  }
};

const AdminOverviewContainer = composeWithTracker(composer)(OverviewTableComponent);

export default connect()(AdminOverviewContainer);
