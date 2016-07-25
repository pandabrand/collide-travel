import React, { Component, PropTypes } from 'react';

export default class EventsRow extends Component {

  handleClick = function() {
    FlowRouter.go('/events/'+ this.props.event._id);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6">
          <div className="event-image-container">
            <div className="event-image">
              <img src={this.props.event.image}/>
            </div>
            <div className="event-title">
              {this.props.event.title}
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6">
          <div className="event-date">{this.props.event.date}</div>
          <div className="event-location">{this.props.event.location}</div>
          <div className="event-more-info"><button className="btn btn-info" type="button" className="more-info-button" onClick={this.handleClick.bind(this)}>more info</button></div>
        </div>
      </div>
    );
  }
}

EventsRow.propTypes = {
  event: PropTypes.object.isRequired,
}
