import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';

import CityArtistsGridItem from './city-artists-grid-item.jsx';
import Spinner from 'react-spinkit';

const getCityArtistsTable = (city, artists, dispatch, props) => {
  if(city && artists) {
    const imgFile = city.printPreview.substr(city.printPreview.lastIndexOf('/') + 1);
    const imgSrc = $.cloudinary.url( imgFile, {width:252, height:303, crop:"fill"});
    return <div className="col-sm-6 col-xs-12 clear artist-tiles">
          <div className="masonry-guides">
            <div className="grid-item">
              <img src={imgSrc} />
            </div>
            <div className="grid-item">
              <img src="http://lorempixel.com/252/303/fashion" />
              <div className="grid-description">
                AD GOES HERE
              </div>
            </div>
            {artists.map((artist,i) => {
              let showLong = i%3 === 0;
              return <CityArtistsGridItem key={i} artist={artist} city={city} showLong={showLong}/>;
            })}
          </div>
        </div>;
  } else {
    return <Spinner spinnerName='cube-grid'/>;
  }
}

export default CityArtistsTableComponent = ( {city, artists, dispatch, props} ) =>
(
  <div>{getCityArtistsTable(city, artists, dispatch, props)}</div>
);
