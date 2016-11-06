import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from  '../dashboard.jsx';
import BootstrapPaginator from 'react-bootstrap-pagination';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export const LocationTableComponent = ({locations, cities, pagination, locationsTextSearch, props}) => {
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

  const autoCompleteArray = () => {
    return locationsTextSearch.map((location,i) => {
      return {
        text: location.name,
        value: (<MenuItem key={i} onClick={() => {editLocation(location._id)}} primaryText={location.name}/>)
      };
    });
  }

  return <DashboardComponent>
    <div id="main-table">
      <h2>Locations</h2> <a href={FlowRouter.path('admin-location-new')} className="btn btn-primary add"><i className="fa fa-plus"/></a>
      <div className="autoCompleteDiv"><MuiThemeProvider><AutoComplete dataSource={autoCompleteArray()} filter={AutoComplete.fuzzyFilter} maxSearchResults={15} floatingLabelText="Type a name, fuzzy search"/></MuiThemeProvider></div>
      <BootstrapPaginator pagination={pagination} limit={10} containerClass='text-center' />
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
            const city = getCity(location.cityId);
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
    </div>
  </DashboardComponent>;
}
