import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';

import CityArtistsGridItem from './city-artists-grid-item.jsx';
import {createMarkup} from '../../lib/utils.js';

const serveCityAd = (ads) => {
  const cityGuideAd = ads ? ads.cityGuideAd : null;
  const ad = (cityGuideAd && cityGuideAd.length > 0) ? <div className="guide-ad"><div dangerouslySetInnerHTML={createMarkup(cityGuideAd)}/></div> : <div className="guide-ad"><img src="/image/new-logo.png" className="img-responsive" srcSet="/images/new-logo.png 1x, /images/new-logo@2x.png"/></div>;
  return ad;
}

const getCityArtistsTable = (city, artists, ads, dispatch, props) => {
  if(city && artists) {
    const imgFile = city.printPreview.substr(city.printPreview.lastIndexOf('/') + 1);
    const imgSrc = $.cloudinary.url( imgFile, {width:252, height:303, crop:"fill"});
    return <div className="city-table-col">
          <div className="masonry-guides">
            <div className="grid-item">
              <img src={imgSrc} />
            </div>
            <div className="grid-item">
                {serveCityAd(ads)}
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

export default CityArtistsTableComponent = ( {city, artists, ads, dispatch, props} ) =>
(
  <div className="col-md-6 col-sm-6 col-xs-12 col-md-pull-6 col-sm-pull-6 artist-tiles">{getCityArtistsTable(city, artists, ads, dispatch, props)}</div>
);
