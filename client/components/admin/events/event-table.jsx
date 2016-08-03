import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import Moment from 'momentjs';

import DashboardComponent from '../dashboard.jsx';

const getEventTable = (events, props) => {
  const deleteEvent = (id) => {
    Meteor.call('events.remove', id);
  }
  const editEvent = (id) => {
    var edit_path = FlowRouter.path('/admin/events/:id',{id:id});
    FlowRouter.go(edit_path);
  }
  return <div id="main-table">
          <h2>Events</h2> <a href={FlowRouter.path('admin-events-new')} className="btn btn-primary add"><i className="fa fa-plus"/></a>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {events.map((event,i) => {
              const doDelete = deleteEvent.bind(event.id);
              return <tr key={i}>
                <td>{event.title}</td>
                <td>{moment(event.eventDate).format('MM/DD/YYYY')}</td>
                <td><button onClick={() => {editEvent(event._id)}} type="button" className="btn btn-primary btn-sm update"><i className="fa fa-edit"/></button></td>
                <td><button onClick={() => {deleteEvent(event._id)}} type="button" className="btn btn-danger btn-sm delete"><i className="fa fa-trash"/></button></td>
                </tr>;
            })}
            </tbody>
          </table>
         </div>;
}

export const EventTableComponent = ( {events, props} ) =>
(<DashboardComponent content={getEventTable(events, props)}/>);
