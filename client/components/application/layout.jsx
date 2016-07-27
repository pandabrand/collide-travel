import React, { Component } from 'react';
import UIHeader from './header.jsx';
import UIFooter from './footer.jsx';
import ExploreBar from '../includes/explore.jsx';

export const Layout = ({content}) => (
  <div>
    <UIHeader/>
    <ExploreBar/>
    <div>{content}</div>
    <UIFooter/>
  </div>
);
