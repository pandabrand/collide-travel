import React from 'react';

import SelectBarComponent from '../includes/select-bar.jsx';
import FeaturedMapsComponent from './featured-maps.jsx';
import FeaturedCitiesComponent from '../city/featured-cities.jsx';
import TrendingContainer from '../../containers/trending.jsx';

const getHome = (homePage, featuredCities, routeName, promotedCity, locations, artists, artistComments, props, dispatch) => {
  return (<div>
    <div id="main" className="fluid-container">
      <img className="hero-image" src={homePage.image} />
      <div className="hero-text">
        <div className="hero-title">{homePage.title}</div>
        <div className="hero-copy">{homePage.subheader}</div>
      </div>
    </div>
    <div className="home-map-container">
      <div className="featured-city-copy">This month's featured city: {promotedCity.displayName}</div>
      <FeaturedMapsComponent homeCity={promotedCity} locations={locations} artists={artists} artistComments={artistComments} props={props} dispatch={dispatch}/>
    </div>
    <FeaturedCitiesComponent props={props} featuredCities={featuredCities} dispatch={dispatch}/>
    <TrendingContainer/>
  </div>);
}

export const HomeComponent = ({homePage, featuredCities, promotedCity, locations, artists, artistComments, routeName, props, dispatch}) => (
  <div>{getHome(homePage, featuredCities, routeName, promotedCity, locations, artists, artistComments, props, dispatch)}</div>
)
