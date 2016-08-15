import React from 'react';

import ArtistHeaderComponent from './artist-header.jsx';
import ArtistMapAndTableComponent from './artist-map-and-table.jsx';
import ArtistSoundcloudComponent from './soundcloud.jsx';

const getArtistGuide = (props, dispatch) => {
  return <div id="main">
          <ArtistHeaderComponent/>
          <ArtistMapAndTableComponent/>
          <ArtistSoundcloudComponent/>
         </div>;
}

export const ArtistGuideComponent = ( {props, dispatch} ) =>
(
  <div>{getArtistGuide(props, dispatch)}</div>
);
