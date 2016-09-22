import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';


const showCityLabel = (cities) => {
  const CURRENT_ROUTE = FlowRouter.current();
  if(CURRENT_ROUTE.params) {
    return CURRENT_ROUTE.params.name ? 'City: '+_.findWhere(cities, {cityName: CURRENT_ROUTE.params.name}).displayName : 'City';
  }
}

const showArtistLabel = (artists) => {
  const CURRENT_ROUTE = FlowRouter.current();
  if(CURRENT_ROUTE.params) {
    return CURRENT_ROUTE.params.artistName ? 'Artist: ' +_.findWhere(artists, {artistSlug: CURRENT_ROUTE.params.artistName}).artistName : 'Artist ';
  }
}

const showCategoryLabel = (locationCategories) => {
  const CURRENT_ROUTE = FlowRouter.current();
  if(CURRENT_ROUTE.params) {
    return CURRENT_ROUTE.params.type ? 'Category: '+_.findWhere(locationCategories, {type: CURRENT_ROUTE.params.type}).type : 'Category ';
  }
}

export const ExploreBarComponent = ({cities, artists, locationCategories, props}) => {
    const CURRENT_ROUTE = FlowRouter.current();
    const cityFilter = (CURRENT_ROUTE.params && CURRENT_ROUTE.params.name) ? {cityName: CURRENT_ROUTE.params.name} : null;
    const selectedArtist = CURRENT_ROUTE.params && CURRENT_ROUTE.params.artistName ? true : false;
    const selectedCategory = CURRENT_ROUTE.params && CURRENT_ROUTE.params.type ? true : false;
    const filteredArtists = cityFilter ? _.where(artists, cityFilter) : artists;
    const filteredCategories = cityFilter ? _.where(locationCategories, cityFilter) : locationCategories;

    return(
      <div className="explore-bar">
        <div className="dropdown">
          <a className="btn" className="explore-btn" href={FlowRouter.path('city-guide-near-me')}><i className="fa fa-crosshairs"/> Near Me</a>
        </div>
        <div className="dropdown">
          <button className={cityFilter ? 'selected btn btn-default dropdown-toggle show-mobile-button' : 'btn btn-default dropdown-toggle show-mobile-button'} type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {showCityLabel(cities)}
            <span className="caret"></span>
          </button>
          <button className={cityFilter ? 'selected btn btn-default dropdown-toggle show-lrgscrn-button' : 'btn btn-default dropdown-toggle show-lrgscrn-button' } type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Explore by {showCityLabel(cities)}
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
          <button className={selectedArtist ? 'selected btn btn-default dropdown-toggle show-mobile-button' : 'btn btn-default dropdown-toggle show-mobile-button'} type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {showArtistLabel(artists)}
            <span className="caret"></span>
          </button>
          <button className={selectedArtist ? 'selected btn btn-default dropdown-toggle show-lrgscrn-button' : 'btn btn-default dropdown-toggle show-lrgscrn-button'} type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Explore by {showArtistLabel(artists)}
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
          <button className={selectedCategory ? 'selected btn btn-default dropdown-toggle show-mobile-button' : 'btn btn-default dropdown-toggle show-mobile-button'} type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {showCategoryLabel(locationCategories)}
            <span className="caret"></span>
          </button>
          <button className={selectedCategory ? 'selected btn btn-default dropdown-toggle show-lrgscrn-button' : 'btn btn-default dropdown-toggle show-lrgscrn-button'} type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Explore by {showCategoryLabel(locationCategories)}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu right-dropdown-menu" aria-labelledby="dropdownMenu3">
            <li><a href='/'>Home</a></li>
            {filteredCategories.map((category, i) => {
              return <li key={i}><a href={(FlowRouter.current().params && FlowRouter.current().params.name) ? FlowRouter.path('city-category-guide',{type:category.type, name:FlowRouter.current().params.name}) : FlowRouter.path('category-guide',{type:category.type})}>{category.type}</a></li>
            })}
          </ul>
        </div>
      </div>
    );
}
