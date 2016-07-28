import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import shouldPureComponentUpdate from 'react-pure-render/function';

import { Cities } from '../../../lib/collections/cities.js';
import { Locations } from '../../../lib/collections/locations.js';

import Spinner from 'react-spinkit';

const getExploreBar = (cities, locationCategories) => {
  if(cities && locationCategories) {
      console.log('cities: ' + JSON.stringify(locationCategories));
      return <div className="explore-bar">
        <form>
          <form-group>
            <label>Explore a city: </label>
            <select className="form-control">
              {cities.map(
                function(city,i) {
                  return <option key={i}>{city.cityName}</option>
                })
              }
            </select>
          </form-group>
          <form-group>
            <label>Search by artist: </label>
            <input type="text" value="" ref="artist-search" placeholder="Artist..."/>
          </form-group>
          <form-group>
            <label>Search by category: </label>
            <select className="form-control">
              {locationCategories.map(
                function(category,i) {
                  return <option key={i}>{category}</option>
                })
              }
            </select>
          </form-group>
        </form>
      </div>;
  } else {
    return <Spinner spinnerName='cube-grid'/>;
  }
}
export const ExploreBar = ({cities, locationCategories}) =>
(
  <div>{getExploreBar(cities, locationCategories)}</div>
);
