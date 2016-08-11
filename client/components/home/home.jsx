import React from 'react';

import SelectBarComponent from '../includes/select-bar.jsx';
import GoogleMapsComponent from './google-maps.jsx';

const getHome = (homePage, homeCity, locations, props, dispatch) => {
  return (<div id="main">
      <img className="hero-image" src={homePage.image} />
      <div className="hero-text">
        <div className="hero-title">{homePage.title}</div>
        <div className="hero-copy">{homePage.subheader}</div>
      </div>
      <SelectBarComponent />
      {/*<GoogleMapsComponent props={props} homeCity={homeCity} locations={locations} dispatch={dispatch}/>*/}
    </div>);
}

export const HomeComponent = ({homePage, homeCity, locations, props, dispatch}) => (
  <div>{getHome(homePage, homeCity, locations, props, dispatch)}</div>
)
