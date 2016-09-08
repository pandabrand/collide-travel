import React, {Component,PropTypes} from 'react';
import {createMarkup} from '../../lib/utils.js';

const getEvent = (event, props, dispatch) => {
  return <div className="row event-row">
    <div className="col-md-4 col-sm-6 col-xs-12 event-header">
      <div className="event-image-page">
        <img className="img-responsive" src={event.image}/>
      </div>
    </div>
    <div className="col-md-8 col-sm-6 col-xs-12">
      <div className="event-copy">
        <p>{event.location}</p>
        <p>{event.date}</p>
        <div dangerouslySetInnerHTML={createMarkup(event.description)}/>
      </div>
    </div>
  </div>;
}

export default function EventComponent ( {event, props, dispatch} ) {
  return <div className="fluid-container">
  <h2>{event.title}</h2>
  {getEvent(event, props, dispatch)}</div>;
}
