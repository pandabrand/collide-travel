import React, {Component} from 'react';

import EventsRowContainer from '../../containers/event-row.jsx';

const getEvents = (events, props, dispatch) => {
  return <div id="main" className="container">
    <div className="row title">
      <h1>Events</h1>
    </div>
    {events.map((event, id) => {
      return <EventsRowContainer key={id} event={event}/>;
    })}
  </div>;
}

export const EventsComponent = ( {events, props, dispatch} ) => {
  return <div>{getEvents(events, props, dispatch)}</div>;
}
