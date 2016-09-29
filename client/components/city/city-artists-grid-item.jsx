import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import {cloudinaryURL} from '../../lib/utils.js';

const getCityArtistsGridItem = (artist,city, showLong, addScrollId) => {
  const goToArtistGuide = (city,artistName) => {
    var params = {name:city,artistName:artistName};
    FlowRouter.go('artist-guide', params);
  };

  const artistColorStyle = { backgroundColor: artist.color };
  let width = showLong ? 551 : 269;
  let scrollID = addScrollId ? 'maintainScroll' : '';
  const imgSrc = cloudinaryURL(artist.image, width, 269);
  return <div id={scrollID} onClick={() => {goToArtistGuide(city.cityName,artist.artistSlug)}} className={showLong ? 'grid-item grid-item--width2' : 'grid-item'}>
    <img src={imgSrc} />
    <div className="grid-description" style={artistColorStyle}>
      {artist.artistName} Guide to {city.displayName}
    </div>
  </div>
}

export default CityArtistsGridItem = ({artist, city, showLong, addScrollId}) =>
(<div>{getCityArtistsGridItem(artist, city, showLong, addScrollId)}</div>);
