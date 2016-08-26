import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';

import {UsersTableComponent} from '../../components/admin/users/users.jsx';
import SpinnerComponent from '../../components/includes/spinner.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('user-list');
  if(subscription.ready()) {
    const users = Meteor.users.find().fetch();
    const userData = {users, props};
    onData(null, userData);
  }
};

const AdminUserContainer = composeWithTracker(composer, SpinnerComponent)(UsersTableComponent);

export default connect()(AdminUserContainer);
