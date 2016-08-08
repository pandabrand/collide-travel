import React, { Component } from 'react';
import UIHeaderComponent from './header.jsx';
import UIFooterComponent from './footer.jsx';
import ExploreBarComponent from '../../containers/explore-bar-container.jsx';

export const LayoutComponent = ({content}) => (
  <div className="fullheight">
    <UIHeaderComponent/>
    <ExploreBarComponent/>
    <div>{content}</div>
    <UIFooterComponent/>
  </div>
);
