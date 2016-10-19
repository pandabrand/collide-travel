import React from 'react';
import ReactDOM from 'react-dom';

import { EventsCollection } from '/lib/collections/events.js';
import { AdZoneCollection } from '/lib/collections/ad-zone.js';

import { EventsComponent } from '../components/events/events.jsx';

import { connect } from 'react-redux';
import { compose,composeWithTracker, composeAll } from 'react-komposer';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('admin-events');
  const adSubscription = Meteor.subscribe('get-ad');
  if(subscription.ready() && adSubscription.ready()) {
    events = EventsCollection.find().fetch();
    ads = AdZoneCollection.findOne({});
    const eventData = {events, ads, props}
    onData(null, eventData);
  }
};

const EventsContainer = connect()(EventsComponent);

export default composeWithTracker(composer, SpinnerComponent)(EventsContainer);
