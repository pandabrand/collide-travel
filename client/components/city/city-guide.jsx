import React from 'react';
import {createMarkup, cloudinaryURL} from '../../lib/utils.js';

export default function CityGuideComponent({city}) {
  return (
    <div className="row city-row">
      <div className="col-sm-2 col-md-3 image side"><div className="side-image"><img src={cloudinaryURL(city.guidePreview, 235, 235)}/></div></div>
      <div className="col-sm-10 col-md-9 content main">
        <h1 className="content-header">{city.displayName}</h1>
        <div className="city-copy">
          <div dangerouslySetInnerHTML={createMarkup(city.description)}/>
        </div>
      </div>
    </div>
  );
};
