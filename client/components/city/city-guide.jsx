import React from 'react';
import {createMarkup, cloudinaryURL} from '../../lib/utils.js';
import SocialShareComponent from '../includes/social-share.jsx';

export default function CityGuideComponent({city}) {
  return (
    <div className="row city-row">
      <div className="col-sm-2 col-md-3 image side"><div className="side-image"><img src={cloudinaryURL(city.guidePreview, 334, 334)}/></div></div>
      <div className="col-sm-10 col-md-9 content main">
        <h1 className="content-header">{city.displayName}</h1>
        <div className="city-copy">
          <div dangerouslySetInnerHTML={createMarkup(city.description)}/>
          <SocialShareComponent city={city}/>
          <div className="photo-credit">{city.photoCredit ? 'photography: ' + city.photoCredit : ''}</div>
        </div>
      </div>
    </div>
  );
};
