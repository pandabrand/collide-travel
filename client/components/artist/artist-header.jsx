import React from 'react';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';
import {createMarkup} from '../../lib/utils.js';

export default function ArtistHeaderComponent({artist, homeCity, props, dispatch}) {
  const imgFile = artist.image.substr(artist.image.lastIndexOf('/') + 1);
  const imgSrc = $.cloudinary.url( imgFile, {width:335, height:335, crop:"fill"});
  return (<div className="jumbotron artist-jumbo">
    <div className="container artist-guide">
      <div className="col-md-5 col-sm-6 col-xs-12 header-img">
        <img className="img-circle" src={imgSrc} />
      </div>
      <div className="col-md-7 col-sm-6 col-xs-12 header-copy">
        <h1>{artist.artistName}'s Guide to {homeCity.displayName}</h1>
        <div className="header-body">
          <div dangerouslySetInnerHTML={createMarkup(artist.description)}/>
        </div>
      </div>
    </div>
  </div>
  );
};
