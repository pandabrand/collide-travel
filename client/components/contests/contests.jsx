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


  export default ContestComponent = ({ads, items}) => {
  return (<div className="fluid-container">
          <h1 className="main-title">CONTESTS</h1>
          {serveStickyAd(ads)}
            {items.map((article, i) => {
              const url = 'http://www.culturecollide.com'+article['dc:image'];
              return <div key={i} className="row trending-row">
                <div className="row">
                <div className="trending-header col-sm-12 col-xs-12 col-md-12">
                  <h1 className="main-title" dangerouslySetInnerHTML={createMarkup(article.title)}></h1>
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12 contest-box">
                  <div className="trending-image">
                    <a href={article.link} target="_blank">
                      <img className="img-responsive" src={url} />
                    </a>
                  </div>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12">
                  <div className="trending-body">
                    <div dangerouslySetInnerHTML={createMarkup(article.description)}></div>
                  </div>
                  <div className="breakout-row">
                    Enter at <a href={article.link} target="_blank">Culture Collide</a>.
                  </div>
                </div>
              </div>
            </div>;
            })}
          {serveTakeoverAd(ads)}
        </div>);
};
