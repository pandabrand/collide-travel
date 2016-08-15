import React from 'react';

export default function CityGuideComponent({city}) {
  const createMarkup = () => { return {__html: city.description}; };
  const imgFile = city.guidePreview.substr(city.guidePreview.lastIndexOf('/') + 1);
  const imgSrc = $.cloudinary.url( imgFile, {width:335, height:335, crop:"fill"});
  return (
    <div className="row city-row">
      <div className="col-sm-3 col-md-4 image side"><div className="side-image"><img src={imgSrc}/></div></div>
      <div className="col-sm-9 col-md-8 content main">
        <h1 className="content-header">{city.displayName}</h1>
        <div className="city-copy">
          <div dangerouslySetInnerHTML={createMarkup()}/>
        </div>
      </div>
    </div>
  );
};
