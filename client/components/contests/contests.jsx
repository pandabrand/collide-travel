import React, { Component, PropTypes } from 'react';
import {createMarkup} from '../../lib/utils.js';

  export default ContestComponent = ({}) => {
  const items = Session.get('contestItem');
  return (<div className="container-fluid featured-container">
          <div className="featured-row row">
            <h1 className="featured-header">CONTESTS</h1>
          </div>
          <div className="row">
            <div className="trending-gallery">
            {items.map((article, i) => {
              const url = 'http://www.culturecollide.com'+article['dc:image'];
              return <div key={i} className="col-md-6 col-sm-6 col-xs-12">
                <a href={article.link} target="_blank">
                <div className="trending-container">
                  <div className="trending-image">
                    <img className="img-responsive" src={url} />
                  </div>
                  <div className="trending-article">
                    <div className="trending-header">
                      <div dangerouslySetInnerHTML={createMarkup(article.title)}/>
                    </div>
                    <div className="trending-body">
                      <div dangerouslySetInnerHTML={createMarkup(article.description)}/>
                    </div>
                  </div>
                </div>
                </a>
              </div>;
            })}
            </div>
          </div>
        </div>);
};
