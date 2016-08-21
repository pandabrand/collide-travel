import React, {Component,PropTypes} from 'react';
import {createMarkup} from '../../lib/utils.js';

const getEvent = (event, props, dispatch) => {
  return <div id="main" className="container">
    <div className="col-md-12 event-header">
      <h2>{event.title}</h2>
      <div className="event-image-page">
        <img className="img-responsive" src={event.image}/>
      </div>
    </div>
    <div className="col-md-12">
      <div className="event-copy">
        <p>{event.location}</p>
        <p>{event.date}</p>
        <div dangerouslySetInnerHTML={createMarkup(event.description)}/>
      </div>
    </div>
  </div>;
}

export default function EventComponent ( {event, props, dispatch} ) {
  return <div>{getEvent(event, props, dispatch)}</div>;
}
