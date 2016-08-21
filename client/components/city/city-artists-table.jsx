import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';

import CityArtistsGridItem from './city-artists-grid-item.jsx';

const getCityArtistsTable = (city, artists, dispatch, props) => {
  if(city && artists) {
    const imgFile = city.printPreview.substr(city.printPreview.lastIndexOf('/') + 1);
    const imgSrc = $.cloudinary.url( imgFile, {width:252, height:303, crop:"fill"});
    return <div className="city-table-col">
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
    return <div className="trending-loading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
    </div>;
  }
}

export default CityArtistsTableComponent = ( {city, artists, dispatch, props} ) =>
(
  <div className="col-md-6 col-sm-6 col-xs-12 col-md-pull-6 col-sm-pull-6 clear artist-tiles">{getCityArtistsTable(city, artists, dispatch, props)}</div>
);
