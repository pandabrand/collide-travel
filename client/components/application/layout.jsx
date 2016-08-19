import React, { Component } from 'react';
import UIHeaderComponent from './header.jsx';
import UIFooterComponent from './footer.jsx';
import ExploreBarSearchComponent from '../../components/includes/explore-bar.jsx';
import ExploreBarContainer from '../../containers/explore-bar-container.jsx';

export const LayoutComponent = ({content}) => (
  <div>
    <UIHeaderComponent/>
    <ExploreBarContainer/>
    <div>{content}</div>
    <UIFooterComponent/>
  </div>
);
