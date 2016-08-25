import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import {cloudinaryURL} from '../../lib/utils.js';

const getFeaturedCities = (featuredCities, dispatch, props) => {
  const CLOUD_KEY = Meteor.settings.public.CLOUDINARY_API_KEY;
  if(featuredCities) {
    return <div>
    <div className="container-fluid featured-city-guides">
      <div className="featured-row row">
        <h1 className="featured-header">FEATURED</h1>
      </div>
    </div>
    <div className="container-fluid featured-city-guides">
      <div className="row featured-gallery">
        {featuredCities.map((city,i) => {
          const pathTo = FlowRouter.path('city-guide',{name:city.cityName});
          return <div key={i} className="col-md-3 col-sm-6 col-xs-6 feature-city-guide">
            <a href={pathTo} >
              <img src={cloudinaryURL(city.printPreview, 280, 390)}/>
            </a>
            <div className="featured-city-guide-callout">
              <a href={pathTo} >
                Explore {city.displayName}
              </a>
            </div>
          </div>;
        })}
      </div>
    </div>
    </div>;
  } else {
    return <div className="trending-loading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
    </div>;
  }
}

export default FeaturedCitiesComponent = ( {featuredCities, dispatch, props} ) =>
(
  <div>{getFeaturedCities(featuredCities, dispatch, props)}</div>
);
