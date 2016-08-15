import React, { Component } from 'react';
import UIHeaderComponent from './header.jsx';
import UIFooterComponent from './footer.jsx';
import ExploreBarSearchComponent from '../../components/includes/explore-bar.jsx';

export const LayoutComponent = ({content}) => (
  <div>
    <UIHeaderComponent/>
    <ExploreBarSearchComponent/>
    <div>{content}</div>
    <UIFooterComponent/>
  </div>
);
