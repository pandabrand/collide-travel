import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from  '../dashboard.jsx';
import BootstrapPaginator from 'react-bootstrap-pagination';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const ArtistTableComponent = ({artists, pagination, textSearchArtists, props}) => {
  const deleteArtist = (id) => {
    Meteor.call('artists.remove', id);
  }
  const editArtist = (id) => {
    const edit_path = FlowRouter.path('/admin/artist/:id', {id:id});
    FlowRouter.go(edit_path);
  }

  const editArtistComments = (id) => {
    const edit_path = FlowRouter.path('/admin/artist/comments/:id', {id:id});
    FlowRouter.go(edit_path);
  }

  const autoCompleteArray = () => {
    return textSearchArtists.map((artist,i) => {
      return {
        text: artist.artistName,
        value: (<MenuItem key={i} onClick={() => {editArtist(artist._id)}} primaryText={artist.artistName}/>)
      };
    });
  }

  return <DashboardComponent>
  <div id="main-table">
    <h2>Artists</h2> <a href={FlowRouter.path('admin-artist-new')} className="btn btn-primary add"><i className="fa fa-plus"/></a>
    <div className="autoCompleteDiv"><MuiThemeProvider><AutoComplete dataSource={autoCompleteArray(artists)} filter={AutoComplete.fuzzyFilter} maxSearchResults={15} floatingLabelText="Type a name, fuzzy search"/></MuiThemeProvider></div>
    <BootstrapPaginator pagination={pagination} limit={10} containerClass='text-center' />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>artistName</th>
          <th>Edit Artist Profile</th>
          <th>Edit Artist Location Comments</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {artists.map((artist,i) => {
          return <tr key={i}>
            <td>{artist.artistName}</td>
            <td><button onClick={() => {editArtist(artist._id)}} type="button" className="btn btn-primary btn-sm update"><i className="fa fa-edit"/></button></td>
            <td><button onClick={() => {editArtistComments(artist._id)}} type="button" className="btn btn-primary btn-sm update"><i className="fa fa-edit"/></button></td>
            <td><button onClick={() => {deleteArtist(artist._id)}} type="button" className="btn btn-danger btn-sm delete"><i className="fa fa-trash"/></button></td>
          </tr>;
        })}
      </tbody>
    </table>
  </div>
</DashboardComponent>;
}
