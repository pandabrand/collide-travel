import React from 'react';
import ReactDOM from 'react-dom';

import { EventsCollection } from '../../lib/collections/events.js';

import EventComponent from '../components/events/event.jsx';

import { composeWithTracker } from 'react-komposer';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('event',props.id);
  if(subscription.ready()) {
    event = EventsCollection.findOne({_id:props.id});
    const eventData = {event, props}
    onData(null, eventData);
  }
};

export default composeWithTracker(composer)(EventComponent);
