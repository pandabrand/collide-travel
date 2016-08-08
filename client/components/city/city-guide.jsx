import React from 'react';

export default function CityGuideComponent({city}) {
  const createMarkup = () => { return {__html: city.description}; };
  return (
    <div className="row city-row">
      <div className="col-sm-3 col-md-4 image side"><div className="side-image"><img src="http://lorempixel.com/320/320/city/2"/></div></div>
      <div className="col-sm-9 col-md-8 content main">
        <h1 className="content-header">{city.displayName}</h1>
        <div className="city-copy">
          <div dangerouslySetInnerHTML={createMarkup()}/>
        </div>
      </div>
    </div>
  );
};
