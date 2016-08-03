import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { EventsCollection } from '../../../lib/collections/events.js';

import {EventTableComponent} from '../../components/admin/events/event-table.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('admin-events');
  if(subscription.ready()) {
    const events = EventsCollection.find().fetch();
    const eventData = {events, props};
    onData(null, eventData);
  }
};

const AdminEventContainer = composeWithTracker(composer)(EventTableComponent);

export default connect()(AdminEventContainer);
