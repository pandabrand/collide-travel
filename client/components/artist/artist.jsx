import React from 'react';

import ArtistHeaderComponent from './artist-header.jsx';
import ArtistMapAndTableComponent from './artist-map-and-table.jsx';
import ArtistSoundcloudComponent from './soundcloud.jsx';
import TrendingContainer from '../../containers/trending.jsx';
import RelatedArtistsComponent from './relatedArtists.jsx';

const getArtistGuide = (artist, homeCity, locations, artistComments, relatedArtists, props, dispatch) => {
  return <div id="main" className="artists-container">
          <ArtistHeaderComponent artist={artist} homeCity={homeCity}/>
          <ArtistMapAndTableComponent artist={artist} homeCity={homeCity} locations={locations} artistComments={artistComments} dispatch={dispatch} props={props}/>
          <ArtistSoundcloudComponent artist={artist}/>
          <TrendingContainer/>
          <RelatedArtistsComponent artists={relatedArtists} homeCity={homeCity} />
         </div>;
}

export const ArtistGuideComponent = ( {artist, homeCity, locations, artistComments, relatedArtists, props, dispatch} ) =>
(
  <div>{getArtistGuide(artist, homeCity, locations, artistComments, relatedArtists, props, dispatch)}</div>
);
