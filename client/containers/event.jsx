import React from 'react';
import ReactDOM from 'react-dom';

import { EventsCollection } from '../../lib/collections/events.js';
import { AdZoneCollection } from '../../lib/collections/ad-zone.js';

import EventComponent from '../components/events/event.jsx';

import { composeWithTracker } from 'react-komposer';
import SpinnerComponent from '../components/includes/spinner.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('event',props.id);
  const adSubscription = Meteor.subscribe('get-ad');
  if(subscription.ready()&& adSubscription.ready()) {
    event = EventsCollection.findOne({_id:props.id});
    ads = AdZoneCollection.findOne({});
    const eventData = {event, ads, props}
    onData(null, eventData);
  }
};

export default composeWithTracker(composer, SpinnerComponent)(EventComponent);
