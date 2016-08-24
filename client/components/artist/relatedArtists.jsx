import React from 'react';

import { Cloudinary } from 'meteor/lepozepo:cloudinary';
import {createMarkup} from '../../lib/utils.js';

const getRelatedArtists = (homeCity, artists) => {
  const shuffledArtist = _.shuffle(artists);
    return <div className="">
    <div className="featured-row row">
      <h1 className="featured-header">RELATED ARTISTS</h1>
    </div>
    <div className="row">
      {shuffledArtist.map((artist, i) => {
        const imgFile = artist.image.substr(artist.image.lastIndexOf('/') + 1);
        const imgSrc = $.cloudinary.url( imgFile, {width:250, height:250, crop:"fill"});
        const link_path = FlowRouter.path('artist-guide',{name:artist.cityName,artistName:artist.artistSlug});
        return <div key={i} className="col-md-4 col-sm-6 col-xs-12">
          <a href={link_path}>
            <div className="related-img">
              <img className="img-responsive" src={imgSrc} />
            </div>
            <div className="related-copy">
              <h3>{artist.artistName}: Guide to {homeCity.displayName}</h3>
            </div>
          </a>
        </div>;
      })}
    </div>
    </div>;
}

export default RelatedArtistsComponent = ({artists, homeCity, props, dispatch}) => {
  return (<div className="container-fluid featured-container">{getRelatedArtists(homeCity, artists)}</div>);
}
