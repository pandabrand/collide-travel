import React, { Component, PropTypes } from 'react';
import {createMarkup} from '../../lib/utils.js';

  export default TrendingComponent = ({trendingArticles}) =>
  (<div className="container-fluid featured-container">
          <div className="featured-row row">
            <h1 className="featured-header">TRENDING</h1>
          </div>
          <div className="row">
            <div className="trending-gallery">
            {trendingArticles.map((article, i) => {
              return <div key={i} className="col-md-4 col-sm-6">
                <a href={article.link} target="_blank">
                <div className="trending-container">
                  <div className="trending-image">
                    <img className="img-responsive" src={article.image} />
                  </div>
                  <div className="trending-article">
                    <div className="trending-header">
                      <div dangerouslySetInnerHTML={createMarkup(article.secondaryTitle)}/>
                    </div>
                    <div className="trending-body">
                      <div dangerouslySetInnerHTML={createMarkup(article.secondaryDescription)}/>
                    </div>
                  </div>
                </div>
                </a>
              </div>;
            })}
            </div>
          </div>
        </div>);
