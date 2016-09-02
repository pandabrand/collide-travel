import Meteor from 'meteor/meteor';
import React from 'react';
import { Session } from 'meteor/session';
import {createMarkup, cloudinaryURL} from '../../lib/utils.js';

import SelectBarComponent from '../includes/select-bar.jsx';
import FeaturedMapsComponent from './featured-maps.jsx';
import FeaturedCitiesComponent from '../city/featured-cities.jsx';
import TrendingContainer from '../../containers/trending.jsx';

// let Waypoint = Meteor.require('react-waypoint');
let Waypoint = require('react-waypoint');

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

const _onWaypointEnter = () => {
  console.log('entering...');
}

const _onWaypointLeave = () => {
  console.log('leaving...');
}

const _onWaypointPositionChange = () => {
  let cityEl = document.getElementById('city-copied');
  console.dir(cityEl.offsetTop);
}

const setWaypoint = (onWaypointEnter, onWaypointLeave, onWaypointPositionChange) => {
  return <Waypoint onEnter={onWaypointEnter} onLeave={onWaypointLeave} onPositionChange={onWaypointPositionChange} />
}

const getHome = (homePage, featuredCities, routeName, promotedCity, locations, artists, artistComments, ads, props, dispatch) => {
  return (<div>
    <div id="main" className="fluid-container">
      <img className="hero-image" src={cloudinaryURL(homePage.image, 1240, 310, 'crop', 'auto')} />
      <div className="hero-text">
        <div className="hero-title">{homePage.title}</div>
        <div className="hero-copy">{homePage.subheader}</div>
      </div>
    </div>
    {serveStickyAd(ads)}
    <div className="home-map-container">
      <div id="city-copied" className="featured-city-copy">This month's featured city: {promotedCity.displayName}</div>
      {setWaypoint(_onWaypointEnter, _onWaypointLeave, _onWaypointPositionChange)}
      <FeaturedMapsComponent homeCity={promotedCity} locations={locations} artists={artists} artistComments={artistComments} props={props} dispatch={dispatch}/>
    </div>
    {serveTakeoverAd(ads)}
    <FeaturedCitiesComponent props={props} featuredCities={featuredCities} dispatch={dispatch}/>
    <TrendingContainer/>
  </div>);
}

export const HomeComponent = ({homePage, featuredCities, promotedCity, locations, artists, artistComments, routeName, ads, props, dispatch}) => (
  <div>{getHome(homePage, featuredCities, routeName, promotedCity, locations, artists, artistComments, ads, props, dispatch)}</div>
)
