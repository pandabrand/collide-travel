import React, {Component} from 'react';

import EventsRowContainer from '../../containers/event-row.jsx';
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

const getEvents = (events, ads, props, dispatch) => {
  return <div id="main" className="fluid-container">
    <h1 className="main-title">Events</h1>
    {serveStickyAd(ads)}
    {events.map((event, id) => {
      return <EventsRowContainer key={id} event={event}/>;
    })}
    {serveTakeoverAd(ads)}
  </div>;
}

export const EventsComponent = ( {events, ads, props, dispatch} ) => {
  return <div>{getEvents(events, ads, props, dispatch)}</div>;
}
