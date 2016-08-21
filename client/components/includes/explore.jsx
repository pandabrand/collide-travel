import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';


const showCityLabel = (cities) => {
  const CURRENT_ROUTE = FlowRouter.current();
  if(CURRENT_ROUTE.params) {
    return CURRENT_ROUTE.params.name ? _.findWhere(cities, {cityName: CURRENT_ROUTE.params.name}).displayName : 'City';
  }
}

const showArtistLabel = (artists) => {
  const CURRENT_ROUTE = FlowRouter.current();
  if(CURRENT_ROUTE.params) {
    return CURRENT_ROUTE.params.artistName ? _.findWhere(artists, {artistSlug: CURRENT_ROUTE.params.artistName}).artistName : 'Artist ';
  }
}

const showCategoryLabel = (locationCategories) => {
  const CURRENT_ROUTE = FlowRouter.current();
  if(CURRENT_ROUTE.params) {
    return CURRENT_ROUTE.params.type ? _.find(locationCategories, function(category){return CURRENT_ROUTE.params.type === category}) : 'Category ';
  }
}


export const ExploreBarComponent = ({cities, artists, locationCategories, props}) => {
    const CURRENT_ROUTE = FlowRouter.current();
    const cityFilter = (CURRENT_ROUTE.params && CURRENT_ROUTE.params.name) ? {cityName: CURRENT_ROUTE.params.name} : null;
    const filteredArtists = cityFilter ? _.where(artists, cityFilter) : artists;
    return(
      <div className="explore-bar">
        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle show-mobile-button" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {showCityLabel(cities)}
            <span className="caret"></span>
          </button>
          <button className="btn btn-default dropdown-toggle show-lrgscrn-button" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Exploring {showCityLabel(cities)}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><a href='/'>Home</a></li>
            {cities.map((city, i) => {
              return <li key={i}><a href={FlowRouter.path('city-guide',{name:city.cityName})}>{city.displayName}</a></li>
            })}
          </ul>
        </div>
        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle show-mobile-button" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {showArtistLabel(artists)}
            <span className="caret"></span>
          </button>
          <button className="btn btn-default dropdown-toggle show-lrgscrn-button" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Exploring with {showArtistLabel(artists)}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li><a href='/'>Home</a></li>
            {filteredArtists.map((artist, i) => {
              return <li key={i}><a href={FlowRouter.path('artist-guide',{name:artist.cityName, artistName:artist.artistSlug})}>{artist.artistName}</a></li>
            })}
          </ul>
        </div>
        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle show-mobile-button" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {showCategoryLabel(locationCategories)}
            <span className="caret"></span>
          </button>
          <button className="btn btn-default dropdown-toggle show-lrgscrn-button" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Exploring {showCategoryLabel(locationCategories)}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li><a href='/'>Home</a></li>
            {locationCategories.map((category, i) => {
              return <li key={i}><a href={FlowRouter.path('category-guide',{type:category})}>{category}</a></li>
            })}
          </ul>
        </div>
      </div>
    );
}
