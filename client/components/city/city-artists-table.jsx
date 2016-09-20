import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import CityArtistsGridItem from './city-artists-grid-item.jsx';
import {createMarkup, cloudinaryURL} from '../../lib/utils.js';

const serveCityAd = (ads, city) => {
  const cityGuideAd = ads ? ads.cityGuideAd : null;
  const ad = (!city.showAdSpaceImage && cityGuideAd && cityGuideAd.length > 0) ? <div className="guide-ad"><div dangerouslySetInnerHTML={createMarkup(cityGuideAd)}></div></div> : (city.showAdSpaceImage && city.cityGuideAdSpaceImage && city.cityGuideAdSpaceImage.length > 0) ? <div className="guide-ad"><a href={city.cityGuideAdSpaceURLlink && city.cityGuideAdSpaceURLlink.legth > 0 ? city.cityGuideAdSpaceURLlink : 'javascript:void(0)'} target="_blank"><img src={cloudinaryURL(city.cityGuideAdSpaceImage, 270, 324, "fit")}/></a></div> : <div className="guide-ad"><img src="/image/new-logo.png" className="img-responsive" srcSet="/images/new-logo.png 1x, /images/new-logo@2x.png"/></div>;
  return ad;
}

const getCityArtistsTable = (city, artists, ads, dispatch, props) => {
  const tableMapClass = !props.mapPosition ? 'col-md-6 col-sm-6 col-md-pull-6 col-sm-pull-6 col-xs-12 artist-tiles' : 'col-md-6 col-sm-6 col-md-pull-6 col-sm-pull-6 col-xs-12  artist-tiles mobile-map-table';

  if(city && artists) {
    return <div className={tableMapClass}>
      <div className="city-table-col">
          <div className="masonry-guides">
            <div className="grid-item">
              <img src={cloudinaryURL(city.printPreview, 270, 324, "fit")} />
            </div>
            <div className="grid-item">
                {serveCityAd(ads, city)}
            </div>
            {artists.map((artist,i) => {
              let showLong = i%3 === 0;
              return <CityArtistsGridItem key={i} artist={artist} city={city} showLong={showLong}/>;
            })}
          </div>
          </div>
        </div>;
  } else {
    return <div className="trending-loading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
    </div>;
  }
}

export default CityArtistsTableComponent = ( {city, artists, ads, dispatch, props} ) =>
(
  <div>{getCityArtistsTable(city, artists, ads, dispatch, props)}</div>
);
