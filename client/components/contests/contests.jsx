import React, { Component, PropTypes } from 'react';
import {createMarkup} from '../../lib/utils.js';

const serveStickyAd = (ads) => {
  const takeoverAd = ads ? ads.takeoverAd : null;
  const showAd = ads ? ads.showAdTakeover : false;
  const ad = (takeoverAd && takeoverAd.length > 0 && showAd) ? <div><div id="sticky-anchor"></div><div id="sticky-ad" className="banner-ad fluid-container ad-container"><div dangerouslySetInnerHTML={createMarkup(takeoverAd)}/></div></div> : '';
  return ad;
}

const serveTakeoverAd = (ads) => {
  const takeoverAd = ads ? ads.takeoverAd : null;
  const showAd = ads ? ads.showAdTakeover : false;
  const ad = (takeoverAd && takeoverAd.length > 0 && showAd) ? <div className="banner-ad fluid-container ad-container"><div dangerouslySetInnerHTML={createMarkup(takeoverAd)}/></div> : '';
  return ad;
}


  export default ContestComponent = ({ads}) => {
  const items = Session.get('contestItem');
  return (<div className="fluid-container featured-container">
          <div className="featured-row row">
            <h1 className="featured-header">CONTESTS</h1>
          </div>
          {serveStickyAd(ads)}
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
          {serveTakeoverAd(ads)}
        </div>);
};
