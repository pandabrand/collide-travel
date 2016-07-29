import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import shouldPureComponentUpdate from 'react-pure-render/function';

import { Cities } from '../../../lib/collections/cities.js';
import { Locations } from '../../../lib/collections/locations.js';
import { Artists } from '../../../lib/collections/artists.js';

import setCitySelection from '../../../lib/client/actions/set-city-selection.js';
import setArtistSelection from '../../../lib/client/actions/set-artist-selection.js';
import setCategorySelection from '../../../lib/client/actions/set-category-selection.js';

import Spinner from 'react-spinkit';

const getExploreBar = (cities, locationCategories, artists, dispatch) => {
  if(cities && locationCategories) {
      return <div className="explore-bar">
        <form>
          <form-group>
            <select onChange={(e) => {return dispatch(setCitySelection(e.target.value))}} className="form-control explore-select">
            <option value='0'>Explore a city:</option>
              {cities.map(
                function(city,i) {
                  return <option value={city._id} key={i}>{city.cityName}</option>
                })
              }
            </select>
          </form-group>
          <form-group>
            <select onChange={(e) => {return dispatch(setArtistSelection(e.target.value))}} className="form-control explore-select">
              <option value='0'>Search by artist:</option>
              {artists.map(
                function(artist,i) {
                  return <option value={artist._id} key={i}>{artist.artistName}</option>
                })
              }
            </select>
          </form-group>
          <form-group>
            <select onChange={(e) => {return dispatch(setCategorySelection(e.target.value))}} className="form-control explore-select">
            <option value='none'>Search by category:</option>
              {locationCategories.map(
                function(category,i) {
                  return <option value={category} key={i}>{category}</option>
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
export const ExploreBar = ({cities, locationCategories, artists, dispatch}) =>
(
  <div>{getExploreBar(cities, locationCategories, artists, dispatch)}</div>
);
