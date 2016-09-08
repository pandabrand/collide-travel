import React, { Component, PropTypes } from 'react';
import {createMarkup} from '../lib/utils.js';
import Moment from 'momentjs';

export default class EventsRowContainer extends Component {

  handleClick = function() {
    FlowRouter.go('/events/'+ this.props.event._id);
  }

  render() {
    return (
      <div className="row trending-row">
        <div className="row">
          <div className="trending-header col-md-12 col-sm-12 col-xs-12">
            <h1>
              {this.props.event.title}
            </h1>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4">
              <div className="trending-image">
                <img className="img-responsive" src={this.props.event.image}/>
              </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-8">
            <div className="trending-body">
              <div className="event-date">{moment(this.props.event.eventDate).format('MMMM Do YYYY, h:mm a')}</div>
              <div className="event-location">{this.props.event.location}</div>
              <div dangerouslySetInnerHTML={createMarkup(this.props.event.description)}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EventsRowContainer.propTypes = {
  event: PropTypes.object.isRequired,
}
