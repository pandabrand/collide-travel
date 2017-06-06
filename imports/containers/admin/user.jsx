import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import {UserTableComponent} from '/imports/components/admin/users/user-table.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';

const pagination = new Meteor.Pagination(Meteor.users);

const composer = (props, onData) => {
  const userTable = pagination.getPage();
  if(pagination.ready()) {
    const userData = {userTable, pagination, props};
    onData(null, userData);
  }
};

const AdminUserContainer = composeWithTracker(composer, SpinnerComponent)(UserTableComponent);

export default connect()(AdminUserContainer);
