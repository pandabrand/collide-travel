import React, { Component, PropTypes } from 'react';
import {createMarkup} from '../../lib/utils.js';
import FullTrendingRow from './full-trending-row.jsx';

  export default FullTrendingComponent = ({res, props}) => {
  return (res ? <div className="fluid-container">
            <h1 className="main-title">TRENDING</h1>
            {res.map((article, i) => {
              return <FullTrendingRow article={article} />;
            })}
          <div className="breakout-row row">
            <div className="breakout-box">Find more at <a href="http://www.culturecollide.com/feed/" target="_blank">Culture Collide</a>.</div>
          </div>
        </div> : null);
};
