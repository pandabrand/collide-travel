import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from  '../dashboard.jsx';
import BootstrapPaginator from 'react-bootstrap-pagination';

export const UserTableComponent = ({userTable, pagination, props}) => {
  const deleteUser = (id) => {
    Meteor.call('users.remove', id);
  }
  const editUser = (id) => {
    const edit_path = FlowRouter.path('/admin/user/:id', {id:id});
    FlowRouter.go(edit_path);
  }

  return <DashboardComponent>
    <div id="main-table">
      <h2>Users</h2> <a href={FlowRouter.path('admin-user-new')} className="btn btn-primary add"><i className="fa fa-plus"/></a>
      <BootstrapPaginator pagination={pagination} limit={10} containerClass='text-center' />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>username</th>
            <th>email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userTable.map((user,i) => {
            return <tr key={i}>
              <td>{user.username}</td>
              <td>{user.emails[0].address}</td>
              <td><button onClick={() => {editCity(city._id)}} type="button" className="btn btn-primary btn-sm update"><i className="fa fa-edit"/></button></td>
              <td><button onClick={() => {deleteCity(city._id)}} type="button" className="btn btn-danger btn-sm delete"><i className="fa fa-trash"/></button></td>
              {/*<td><button type="button" className="btn btn-danger btn-sm delete" data-toggle="modal" data-target="#deleteModal" data-delete={city._id}><i className="fa fa-trash"/></button></td>*/}
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
              <h4 className="modal-title" id="deleteModalLabel">Delete User</h4>
            </div>
            <div className="modal-body bg-danger">
              You are about to delete this User permanently. Are you sure?
            </div>
            <div className="modal-footer">
              <input type="hidden" value="" name="cityDeleteId"/>
              <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
              <button type="button" className="btn btn-danger">Yes, Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardComponent>;
}
