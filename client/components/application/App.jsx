import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Meteor from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import UIHeader from './header.jsx';
import UIFooter from './footer.jsx';
import ExploreBar from '../includes/explore.jsx';

//App component - base app
export const Layout = ({content}) => (
  <div id="wrapper">
    <UIHeader/>
    <ExploreBar/>
    <div>{content}</div>
    <UIFooter/>
  </div>
);
