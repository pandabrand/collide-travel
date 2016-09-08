import React, { Component } from 'react';
import UIHeaderComponent from './header.jsx';
import UIFooterComponent from './footer.jsx';
import ExploreBarSearchComponent from '../../components/includes/explore-bar.jsx';
import ExploreBarContainer from '../../containers/explore-bar-container.jsx';
import store from '../../../lib/client/store/store.js';

getContent = (ads, content) => {React.createElement(content, {ads: ads});}

export const LayoutComponent = ({ads, content}) => {
  return (<div>
    <UIHeaderComponent ads={ads}/>
    <ExploreBarContainer/>
    {/*<div className="shim"></div>*/}
    <div>{content}</div>
    <UIFooterComponent/>
  </div>
);
}
