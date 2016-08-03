import React from 'react';
import ReactDOM from 'react-dom';

import { Events } from '../../lib/collections/events.js';

import { EventsPage } from '../components/events/events.jsx';

import { connect } from 'react-redux';
import { compose,composeWithTracker, composeAll } from 'react-komposer';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('admin-events');
  if(subscription.ready()) {
    events = Events.find().fetch();
    const eventData = {events, props}
    onData(null, eventData);
  }
};

const EventsContainer = connect()(EventsPage);

export default composeWithTracker(composer)(EventsContainer);
