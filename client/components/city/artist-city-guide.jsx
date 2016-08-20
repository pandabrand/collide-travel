import React from 'react';
import createMarkup from '../../lib/utils.js';

export default function ArtistCityGuideComponent({artist, city}) {
  return (
    <div className="row artist-row">
      <div className="col-sm-3 col-md-4 image side"><div className="side-image"><img src="http://lorempixel.com/320/320/people/2"/></div></div>
      <div className="col-sm-9 col-md-8 content main">
        <h1 className="content-header">{artist.artistName}</h1>
        <h4>{city.displayName}</h4>
        <div className="artist-copy">
          <div dangerouslySetInnerHTML={createMarkup(city.description)}/>
        </div>
      </div>
    </div>
  );
};
