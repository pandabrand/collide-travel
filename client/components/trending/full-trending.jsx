import React, { Component, PropTypes } from 'react';
import {createMarkup} from '../../lib/utils.js';
import FullTrendingRow from './full-trending-row.jsx';

  export default FullTrendingComponent = ({res, props}) => {
  return (res ? <div className="container-fluid">
          <div className="featured-row row">
            <h1 className="main-trending-header">TRENDING</h1>
          </div>
            {res.map((article, i) => {
              return <FullTrendingRow article={article} />;
            })}
          <div className="breakout-row row">
            <div className="breakout-box">Find more at <a href="http://culturecollide.com" target="_blank">Culture Collide</a>.</div>
          </div>
        </div> : null);
};
