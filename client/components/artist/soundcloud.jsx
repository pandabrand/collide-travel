import React from 'react';

const createMarkup = () => { return {__html: artist.soundcloud}; };

const getSoundcloud = (artist) => {
  if(artist.soundcloud) {
    return <div className="row">
      <div className="soundcloud-embed">
        <div className="soundcloud-container">
          <div dangerouslySetInnerHTML={createMarkup()}/>
        </div>
      </div>
      </div>;
  } else {
    return '';
  }

}
export default ArtistSoundcloudComponent = ({artist, props, dispatch}) => {
  return (<div className="fluid-container">{getSoundcloud(artist)}</div>);
}
