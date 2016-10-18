import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {BlazeExploreBarComponent} from './blaze-explore-bar.jsx';

const getExploreBar = (props) => {
  return <BlazeExploreBarComponent {...props}/>;
}

export default ExploreBarSearchComponent = ({props}) => {
  return <div className="explore-bar">{getExploreBar(props)}</div>;
};
