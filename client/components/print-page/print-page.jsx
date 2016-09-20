import React, {Component} from 'react';

import PrintElementComponent from './print-element.jsx';
import MagazineElementComponent from './magazine-element.jsx';
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

const renderMagazineElements = (magazines) => {
  return magazines.map((print, i) => {
    return <MagazineElementComponent key={i} print={print}/>;
  });
}

export default function PrintPageComponent({cities, magazines, ads, page}) {
  return(<div id="main" className="fluid-container">
      <h1 className="main-title">{page.title}</h1>
      <div className="page-copy">
        <div dangerouslySetInnerHTML={createMarkup(page.copy)}></div>
      </div>
      {serveStickyAd(ads)}
      <div className="print-gallery">
        <div className="row print-row">
          {renderMagazineElements(magazines)}
        </div>
        <div className="row print-row">
          {renderPrintElements(cities)}
        </div>
      </div>
      {serveTakeoverAd(ads)}
    </div>);
};
