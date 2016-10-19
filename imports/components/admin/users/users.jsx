import React, { Component, PropTypes } from 'react';
import DashboardComponent from  '../dashboard.jsx';

const getUsersTable = (users) => {
  const deleteUser = (id) => {
    Meteor.call('user.remove', id);
  }
  const editUser = (username) => {
    const edit_path = FlowRouter.path('/admin/users/edit/:username', {username:username});
    FlowRouter.go(edit_path);
  }
  return <div className="main-table">
  <h2>Users</h2> <a href={FlowRouter.path('admin-user-new')} className="btn btn-primary add"><i className="fa fa-plus"/></a>
  <table className="table table-hover">
    <thead>
      <tr>
        <td>email</td>
        <td>username</td>
        <td>roles</td>
        <td>edit</td>
        <td>delete</td>
      </tr>
    </thead>
    <tbody>
      {users.map(function(user,i){
          return <tr key={i}>
            <td><h4>{user.emails[0].address}</h4></td>
            <td>
              {user.username}
            </td>
            <td>{user.roles.default}</td>
            {/*<td><button onClick={() => {editUser(user.username)}} type="button" className="btn btn-primary btn-sm update"><i className="fa fa-edit"/></button></td>
            <td><button onClick={() => {deleteUser(user._id)}} type="button" className="btn btn-danger btn-sm delete"><i className="fa fa-trash"/></button></td>*/}
          </tr>;
        })
      }
    </tbody>
  </table>
  </div>;
}

export const UsersTableComponent = ({users}) =>
(<DashboardComponent content={getUsersTable(users)}/>);
