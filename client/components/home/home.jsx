import React from 'react';

import SelectBarComponent from '../includes/select-bar.jsx';
import GoogleMapsComponent from './google-maps.jsx';

const getHome = (homeCity, locations, props, dispatch) => {
  return (<div id="main">
      <img className="hero-image" src="http://lorempixel.com/g/1210/480/nature/1/Dummy-Text" />
      <div className="hero-text">
        <div className="hero-title">This is where text will go.</div>
        <div className="hero-copy">Now we will have more text below.</div>
      </div>
      <SelectBarComponent />
      <GoogleMapsComponent props={props} homeCity={homeCity} locations={locations} dispatch={dispatch}/>
    </div>);
}

export const HomeComponent = ({homeCity, locations, props, dispatch}) => (
  <div>{getHome(homeCity, locations, props, dispatch)}</div>
)
