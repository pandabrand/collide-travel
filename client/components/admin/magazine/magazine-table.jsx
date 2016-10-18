import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from  '../dashboard.jsx';

const getMagazineTable = (magazines, props) => {
  const deleteMagazine = (id) => {
    Meteor.call('magazines.remove', id);
  }
  const editMagazine = (id) => {
    const edit_path = FlowRouter.path('/admin/magazine/:id', {id:id});
    FlowRouter.go(edit_path);
  }

  return <div id="main-table">
    <h2>TWP Magazines</h2> <a href={FlowRouter.path('admin-magazine-new')} className="btn btn-primary add"><i className="fa fa-plus"/></a>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Issue</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {magazines.map((magazine,i) => {
          return <tr key={i}>
            <td>{magazine.issue}</td>
            <td><button onClick={() => {editMagazine(magazine._id)}} type="button" className="btn btn-primary btn-sm update"><i className="fa fa-edit"/></button></td>
            <td><button onClick={() => {deleteMagazine(magazine._id)}} type="button" className="btn btn-danger btn-sm delete"><i className="fa fa-trash"/></button></td>
            {/*<td><button type="button" className="btn btn-danger btn-sm delete" data-toggle="modal" data-target="#deleteModal" data-delete={magazine._id}><i className="fa fa-trash"/></button></td>*/}
          </tr>;
        })}
      </tbody>
    </table>
    <div className="modal fade" id="deleteModal" role="dialog" aria-labelledby="deleteModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title" id="deleteModalLabel">Delete Magazine Guide</h4>
          </div>
          <div className="modal-body bg-danger">
            You are about to delete this Magazine Guide permanently. Are you sure?
          </div>
          <div className="modal-footer">
            <input type="hidden" value="" name="magazineDeleteId"/>
            <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
            <button type="button" className="btn btn-danger">Yes, Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export const MagazineTableComponent = ({magazines, props}) =>
(<DashboardComponent content={getMagazineTable(magazines, props)}/>);
