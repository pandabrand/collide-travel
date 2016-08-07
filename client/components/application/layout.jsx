import React, { Component } from 'react';
import UIHeaderComponent from './header.jsx';
import UIFooterComponent from './footer.jsx';
import ExploreBarComponent from '../../containers/explore-bar-container.jsx';

export const LayoutComponent = ({content}) => (
  <div>
    <UIHeaderComponent/>
    <ExploreBarComponent/>
    <main>{content}</main>
    <UIFooterComponent/>
  </div>
);
