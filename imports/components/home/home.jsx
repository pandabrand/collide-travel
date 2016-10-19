import Meteor from 'meteor/meteor';
import React from 'react';
import { Session } from 'meteor/session';
import {createMarkup, cloudinaryURL} from '/lib/utils.js';

import SelectBarComponent from '../includes/select-bar.jsx';
import FeaturedMapsComponent from './featured-maps.jsx';
import FeaturedCitiesComponent from '../city/featured-cities.jsx';
import TrendingContainer from '../../containers/trending.jsx';
import NewsletterModal from '../modals/newsletter-modal.jsx';
import Waypoint from 'react-waypoint';


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

const getHome = (homePage, featuredCities, routeName, promotedCity, locations, artists, artistComments, ads, props, dispatch) => {
  const _width = (typeof window !== 'undefined') ? window.innerWidth : '';
  return (<div>
    <div id="main" className="fluid-container">
      <img className="hero-image" src={cloudinaryURL(homePage.image, 1280, undefined, 'fill', 'auto', '2.0')} />
      <div className="hero-text">
        <div className="hero-title">{homePage.title}</div>
        <div className="hero-copy">{homePage.subheader}</div>
      </div>
    </div>
    {serveStickyAd(ads)}
    <div className="home-map-container">
      <div id="city-copied" className="featured-city-copy">This month's featured city: {promotedCity.displayName}</div>
      <FeaturedMapsComponent homeCity={promotedCity} locations={locations} artists={artists} artistComments={artistComments} props={props} dispatch={dispatch}/>
    </div>
    {serveTakeoverAd(ads)}
    <FeaturedCitiesComponent props={props} featuredCities={featuredCities} dispatch={dispatch}/>
    <TrendingContainer/>
    <NewsletterModal shouldCloseOnOverlayClick={true} title="Let COLLiDE come to you." text="Sign up for weekly updates about new city guides, contests, and events in your city."/>
  </div>);
}

export const HomeComponent = ({homePage, featuredCities, promotedCity, locations, artists, artistComments, routeName, ads, props, dispatch}) => (
  <div>{getHome(homePage, featuredCities, routeName, promotedCity, locations, artists, artistComments, ads, props, dispatch)}</div>
)
