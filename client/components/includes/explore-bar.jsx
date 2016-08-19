import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import {BlazeExploreBarComponent} from './blaze-explore-bar.jsx';

const getExploreBar = (props) => {
  console.dir(props);
  return <BlazeExploreBarComponent {...props}/>;
}

export default ExploreBarSearchComponent = ({props}) => {
  return <div className="explore-bar">{getExploreBar(props)}</div>;
};
