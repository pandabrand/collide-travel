import React, { Component, PropTypes } from 'react';

  export default TrendingComponent = ({trendingArticles}) => 
  (<div className="container-fluid featured-container">
          <div className="featured-row row">
            <h1 className="featured-header">TRENDING</h1>
          </div>
          <div className="row">
            <div className="trending-gallery">
            {trendingArticles.map((article, i) => {
              return <div key={i} className="col-md-4 col-sm-6">
                <img src="http://lorempixel.com/375/550/fashion" />
              </div>;
            })}
            </div>
          </div>
        </div>);
