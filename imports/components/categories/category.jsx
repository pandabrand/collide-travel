import React from 'react';

import CategoryGuideComponent from './category-guide.jsx';
import CityMapComponent from '/imports/components/home/google-maps.jsx';
import {createMarkup} from '/lib/utils.js';

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


const getCategory = (homeCity, locations, artists, artistComments, ads, props, dispatch) => {
  const categoryHeader = FlowRouter.current().params && FlowRouter.current().params.name ? homeCity.displayName + ': ' + props.type : props.type;
  return <div id="main">
          <CategoryGuideComponent category={categoryHeader} />
          <div>
            {serveStickyAd(ads)}
          </div>
          <div className="map-border">
            <CityMapComponent homeCity={homeCity} locations={locations} artists={artists} artistComments={artistComments} props={props} dispatch={dispatch}/>
          </div>
          {serveTakeoverAd(ads)}
         </div>;
}

export const CategoryComponent = ( {homeCity, locations, artists, artistComments, ads, props, dispatch} ) =>
(
  <div>{getCategory(homeCity, locations, artists, artistComments, ads, props, dispatch)}</div>
);
