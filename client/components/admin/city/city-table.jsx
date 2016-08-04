import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import DashboardComponent from  '../dashboard.jsx';

const getCityTable = (cities, props) => {
  const deleteCity = (id) => {
    Meteor.call('cities.remove', id);
  }
  const editCity = (id) => {
    const edit_path = FlowRouter.path('/admin/city/:id', {id:id});
    FlowRouter.go(edit_path);
  }

  return <div id="main-table">
    <h2>Cities</h2> <a href={FlowRouter.path('admin-city-new')} className="btn btn-primary add"><i className="fa fa-plus"/></a>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>City</th>
          <th>State</th>
          <th>Default?</th>
          <th>Promoted?</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {cities.map((city,i) => {
          return <tr key={i}>
            <td>{city.displayName}</td>
            <td>{city.state}</td>
            <td>{city.isDefault ? 'yes' : 'no'}</td>
            <td>{city.isPromoted ? 'yes' : 'no'}</td>
            <td><button onClick={() => {editCity(city._id)}} type="button" className="btn btn-primary btn-sm update"><i className="fa fa-edit"/></button></td>
            <td><button onClick={() => {deleteCity(city._id)}} type="button" className="btn btn-danger btn-sm delete"><i className="fa fa-trash"/></button></td>
          </tr>;
        })}
      </tbody>
    </table>
  </div>;
}

export const CityTableComponent = ({cities, props}) =>
(<DashboardComponent content={getCityTable(cities, props)}/>);
