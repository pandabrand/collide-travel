import React from 'react';
import {createMarkup, cloudinaryURL} from '../../lib/utils.js';

export default function ArtistHeaderComponent({artist, homeCity, props, dispatch}) {
  return (<div className="jumbotron artist-jumbo">
    <div className="container artist-guide">
      <div className="col-md-3 col-sm-4 col-xs-12 header-img">
        <img className="img-circle img-responsive img-center" src={cloudinaryURL(artist.image, 235, 235, 'fill', 'faces')} />
      </div>
      <div className="col-md-9 col-sm-8 col-xs-12 header-copy">
        <h1>{artist.artistName}: Guide to {homeCity.displayName}</h1>
        <div className="header-body">
          <div dangerouslySetInnerHTML={createMarkup(artist.description)}/>
        </div>
      </div>
    </div>
  </div>
  );
};
