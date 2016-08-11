import React, { Component } from 'react';
import UIHeaderComponent from './header.jsx';
import UIFooterComponent from './footer.jsx';
import ExploreBarComponent from '../../containers/explore-bar-container.jsx';
// import {ExploreBarComponent} from '../../containers/explore-bar.jsx';
// import ExploreBarComponent from '../../components/includes/explore.jsx';

export const LayoutComponent = ({content}) => (
  <div>
    <UIHeaderComponent/>
    <ExploreBarComponent/>
    <div>{content}</div>
    <UIFooterComponent/>
  </div>
);
