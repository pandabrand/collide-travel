import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import DashboardComponent from  '../dashboard.jsx';

const getArtistTable = (artists, props) => {
  const deleteArtist = (id) => {
    Meteor.call('artists.remove', id);
  }
  const editArtist = (id) => {
    const edit_path = FlowRouter.path('/admin/artist/:id', {id:id});
    FlowRouter.go(edit_path);
  }

  return <div id="main-table">
    <h2>Artists</h2> <a href={FlowRouter.path('admin-artist-new')} className="btn btn-primary add"><i className="fa fa-plus"/></a>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>artistName</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {artists.map((artist,i) => {
          return <tr key={i}>
            <td>{artist.artistName}</td>
            <td><button onClick={() => {editArtist(artist._id)}} type="button" className="btn btn-primary btn-sm update"><i className="fa fa-edit"/></button></td>
            <td><button onClick={() => {deleteArtist(artist._id)}} type="button" className="btn btn-danger btn-sm delete"><i className="fa fa-trash"/></button></td>
          </tr>;
        })}
      </tbody>
    </table>
  </div>;
}

export const ArtistTableComponent = ({artists, props}) =>
(<DashboardComponent content={getArtistTable(artists, props)}/>);
