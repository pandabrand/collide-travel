import React, { Component } from 'react';
import UIHeaderComponent from './header.jsx';
import UIFooterComponent from './footer.jsx';
// import ExploreBarComponent from '../../containers/explore-bar-container.jsx';
// import {ExploreBarComponent} from '../../containers/explore-bar.jsx';
// import ExploreBarComponent from '../../components/includes/explore.jsx';
import ExploreBarSearchComponent from '../../components/includes/explore-bar.jsx';

export const LayoutComponent = ({content}) => (
  <div>
    <UIHeaderComponent/>
    {/*<ExploreBarComponent/>*/}
    <ExploreBarSearchComponent/>
    <div>{content}</div>
    <UIFooterComponent/>
  </div>
);
