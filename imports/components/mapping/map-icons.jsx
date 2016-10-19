import React from 'react';


export default MapIconComponent = ({type}) => {
  switch (type) {
    case 'bar':
      return <i className="fa fa-beer map-icon" aria-hidden="true"></i>;
    case 'restaurant':
      return <i className="fa fa-cutlery map-icon" aria-hidden="true"></i>;
    case 'music':
      return <i className="fa fa-music map-icon" aria-hidden="true"></i>;
    case 'boutique':
      return <i className="fa fa-shopping-basket map-icon" aria-hidden="true"></i>;
    case 'nightclub':
      return <i className="fa fa-glass map-icon" aria-hidden="true"></i>;
    case 'gallery':
      return <i className="fa fa-university map-icon" aria-hidden="true"></i>;
    case 'museum':
      return <i className="fa fa-university map-icon" aria-hidden="true"></i>;
    case 'cinema':
      return <i className="fa fa-movies map-icon" aria-hidden="true"></i>;
    case 'hot-spot':
      return <i className="fa fa-flash map-icon" aria-hidden="true"></i>;
    default:
      return <i className="fa fa-flag map-icon" aria-hidden="true"></i>;

  }
}
