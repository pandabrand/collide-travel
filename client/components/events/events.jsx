import React, {Component} from 'react';

import EventsRow from '../../containers/event-row.jsx';

const getEvents = (events, props, dispatch) => {
  return <div id="main" className="container">
    <div className="row title">
      <h1>Events</h1>
    </div>
    {events.map((event, id) => {
      return <EventsRow key={id} event={event}/>;
    })}
  </div>;
}

export const EventsPage = ( {events, props, dispatch} ) => {
  return <div>{getEvents(events, props, dispatch)}</div>;
}
