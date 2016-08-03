import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import { Events } from '../../../lib/collections/events.js';

import {EventTable} from '../../components/admin/events/event-table.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('admin-events');
  if(subscription.ready()) {
    const events = Events.find().fetch();
    const eventData = {events, props};
    onData(null, eventData);
  }
};

const AdminEventContainer = composeWithTracker(composer)(EventTable);

export default connect()(AdminEventContainer);
