import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import DashboardComponent from  '../dashboard.jsx';

const getLocationTable = (locations, cities, props) => {
  const deleteLocation = (id) => {
    Meteor.call('locations.remove', id);
  }
  const editLocation = (id) => {
    const edit_path = FlowRouter.path('/admin/location/:id', {id:id});
    FlowRouter.go(edit_path);
  }

  const getCity = (id) => {
    var filtered = _.where(cities,{_id: id});
    return filtered[0];
  }

  return <div id="main-table">
    <h2>Locations</h2> <a href={FlowRouter.path('admin-location-new')} className="btn btn-primary add"><i className="fa fa-plus"/></a>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>name</th>
          <th>type</th>
          <th>city</th>
          <th>address</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location,i) => {
          console.log('location: ' + location.name + ' city: ' + location.cityId);
          const city = getCity(location.cityId);
          console.dir(city);
          return <tr key={i}>
            <td>{location.name}</td>
            <td>{location.type}</td>
            <td>{city.displayName}</td>
            <td>{location.address ? 'yes' : 'no'}</td>
            <td><button onClick={() => {editLocation(location._id)}} type="button" className="btn btn-primary btn-sm update"><i className="fa fa-edit"/></button></td>
            <td><button onClick={() => {deleteLocation(location._id)}} type="button" className="btn btn-danger btn-sm delete"><i className="fa fa-trash"/></button></td>
          </tr>;
        })}
      </tbody>
    </table>
  </div>;
}

export const LocationTableComponent = ({locations, cities, props}) =>
(<DashboardComponent content={getLocationTable(locations, cities, props)}/>);
