import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';

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
        {/*280x390*/}
        {featuredCities.map((city,i) => {
          const imgFile = city.printPreview.substr(city.printPreview.lastIndexOf('/') + 1);
          const imgSrc = $.cloudinary.url( imgFile, {width:280, height:390, crop:"fill"});
          const pathTo = FlowRouter.path('city-guide',{name:city.cityName});
          return <div key={i} className="col-md-3 col-sm-6 feature-city-guide">
            <a href={pathTo} >
              <img src={imgSrc}/>
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
    return <div className="trending-loading"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
    </div>;
  }
}

export default FeaturedCitiesComponent = ( {featuredCities, dispatch, props} ) =>
(
  <div>{getFeaturedCities(featuredCities, dispatch, props)}</div>
);
