import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DashboardComponent from  '../dashboard.jsx';

export const PageTableComponent = ({pages, props}) => {
  const deletePage = (id) => {
    Meteor.call('pages.remove', id);
  }

  const editPage = (id) => {
    const edit_path = FlowRouter.path('/admin/pages/:id', {id:id});
    FlowRouter.go(edit_path);
  }

  return <DashboardComponent>
    <div id="main-table">
      <h2>Pages</h2> <a href={FlowRouter.path('admin-page-new')} className="btn btn-primary add"><i className="fa fa-plus"/></a>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>title</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page,i) => {
            return <tr key={i}>
              <td>{page.title}</td>
              <td><button onClick={() => {editPage(page._id)}} type="button" className="btn btn-primary btn-sm update"><i className="fa fa-edit"/></button></td>
              <td><button onClick={() => {deletePage(page._id)}} type="button" className="btn btn-danger btn-sm delete"><i className="fa fa-trash"/></button></td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  </DashboardComponent>;
}
