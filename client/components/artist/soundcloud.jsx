import React from 'react';

import {createMarkup} from '../../lib/utils.js';

const getSoundcloud = (artist) => {
  if(artist.soundcloud) {
    return <div className="row">
      <div className="soundcloud-embed">
        <div className="soundcloud-container">
          <div dangerouslySetInnerHTML={createMarkup(artist.soundcloud)}/>
        </div>
      </div>
      </div>;
  } else {
    return '';
  }

}
export default ArtistSoundcloudComponent = ({artist, props, dispatch}) => {
  return (<div className="container">{getSoundcloud(artist)}</div>);
}
