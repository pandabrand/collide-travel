import React from 'react';
import ReactDOM from 'react-dom';

import Waypoint from 'react-waypoint';
import CityGuideComponent from './city-guide.jsx';
import ArtistCityGuideComponent from './artist-city-guide.jsx';
import CityMapsComponent from './city-map.jsx';
import CityArtistsTableComponent from './city-artists-table.jsx';
import TrendingContainer from '../../containers/trending.jsx';
import {createMarkup} from '../../lib/utils.js';
import setMapPosition from '../../../lib/client/actions/set-map-position.js';


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

const getCity = (homeCity, locations, artists, artistComments, ads, props, dispatch) => {
  _onChildScroll = (key, childProps) => {
  }


  const _onWaypointEnter = (currentPosition) => {
    if(window.matchMedia('(max-width: 511px)').matches && currentPosition.currentPosition === 'inside') {
      return dispatch(setMapPosition(false));
    }
  }

  const _onWaypointLeave = (currentPosition) => {
    if(window.matchMedia('(max-width: 511px)').matches && currentPosition.currentPosition === 'above') {
      return dispatch(setMapPosition(currentPosition.currentPosition === 'above'));
    }
  }

  const _onWaypointPositionChange = (currentPosition) => {
  }

  return <div id="main" className="fluid-container">
          <CityGuideComponent city={homeCity} />
          {/*<CityMapComponent homeCity={homeCity} locations={locations} artist={artist} artistComments={artistComments} props={props} dispatch={dispatch}/>*/}
          <div>
            {serveStickyAd(ads)}
          </div>
          <div className="fluid-container map-border">
            <div className="row city-wrapper featured-city">
              <Waypoint scrollableAncestor={window} onEnter={_onWaypointEnter} onLeave={_onWaypointLeave} onPositionChange={_onWaypointPositionChange}/>
              <CityMapsComponent key="artists-city-map-component" dispatch={dispatch} props={props} city={homeCity} locations={locations} artists={artists} artistComments={artistComments}/>
              <CityArtistsTableComponent ads={ads} city={homeCity} artists={artists} props={props}/>
              <div className="get-clear"></div>
            </div>
         </div>
         {serveTakeoverAd(ads)}
         <TrendingContainer/>
         </div>;
}

export const CityComponent = ( {homeCity, locations, artists, artistComments, ads, props, dispatch} ) =>
(
  <div>{getCity(homeCity, locations, artists, artistComments, ads, props, dispatch)}</div>
);
