import React from 'react';

import ArtistHeaderComponent from './artist-header.jsx';
import ArtistMapAndTableComponent from './artist-map-and-table.jsx';
import ArtistSoundcloudComponent from './soundcloud.jsx';
import TrendingContainer from '../../containers/trending.jsx';

const getArtistGuide = (artist, homeCity, locations, artistComments, props, dispatch) => {
  return <div id="main" className="artists-container">
          <ArtistHeaderComponent artist={artist} homeCity={homeCity}/>
          <ArtistMapAndTableComponent artist={artist} homeCity={homeCity} locations={locations} artistComments={artistComments} dispatch={dispatch} props={props}/>
          <ArtistSoundcloudComponent artist={artist}/>
          <TrendingContainer/>
         </div>;
}

export const ArtistGuideComponent = ( {artist, homeCity, locations, artistComments, props, dispatch} ) =>
(
  <div>{getArtistGuide(artist, homeCity, locations, artistComments, props, dispatch)}</div>
);
