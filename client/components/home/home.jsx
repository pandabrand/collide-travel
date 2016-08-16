import React from 'react';

import SelectBarComponent from '../includes/select-bar.jsx';
import GoogleMapsComponent from './google-maps.jsx';
import FeaturedCitiesComponent from '../city/featured-cities.jsx';
import TrendingContainer from '../../containers/trending.jsx';

const getHome = (homePage, featuredCities, props, dispatch) => {
  return (<div>
    <div id="main" className="fluid-container">
      <img className="hero-image" src={homePage.image} />
      <div className="hero-text">
        <div className="hero-title">{homePage.title}</div>
        <div className="hero-copy">{homePage.subheader}</div>
      </div>
    </div>
    <FeaturedCitiesComponent props={props} featuredCities={featuredCities} dispatch={dispatch}/>
    <TrendingContainer/>
  </div>);
}

export const HomeComponent = ({homePage, featuredCities, props, dispatch}) => (
  <div>{getHome(homePage, featuredCities, props, dispatch)}</div>
)
