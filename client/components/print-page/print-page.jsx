import React, {Component} from 'react';

import PrintElementComponent from './print-element.jsx';
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

const renderPrintElements = (cities) => {
  return cities.map((print, i) => {
    return <PrintElementComponent key={i} print={print}/>;
  });
}

export default function PrintPageComponent({cities, ads}) {
  return(<div id="main" className="fluid-container">
      <h1 className="main-title">City Guides</h1>
      <div className="page-copy">
        <p>This 10” x 12” book explores the intersection of music and travel, with tips, tour diaries, stories from the road, food recommendations, and musings on world travel, straight from the artists themselves.</p>
        <p>Fill out the form below to receive a free download, or purchase a physical copy for $14.95 + tax:</p>
      </div>
      {serveStickyAd(ads)}
      <div className="print-gallery">
        <div className="row print-row">
          {renderPrintElements(cities)}
        </div>
      </div>
      {serveTakeoverAd(ads)}
    </div>);
};
