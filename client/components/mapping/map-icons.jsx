import React from 'react';


export default MapIcon = ({type}) => {
  switch (type) {
    case 'bar':
      return <i className="fa fa-beer" aria-hidden="true"></i>;
    case 'restaurant':
      return <i className="fa fa-cutlery" aria-hidden="true"></i>;
    case 'music':
      return <i className="fa fa-music" aria-hidden="true"></i>;
    case 'boutique':
      return <i className="fa fa-shopping-basket" aria-hidden="true"></i>;
    case 'nightclub':
      return <i className="fa fa-glass" aria-hidden="true"></i>;
    case 'gallery':
      return <i className="fa fa-university" aria-hidden="true"></i>;
    case 'museum':
      return <i className="fa fa-university" aria-hidden="true"></i>;
    case 'cinema':
      return <i className="fa fa-movies" aria-hidden="true"></i>;
    case 'hot-spot':
      return <i className="fa fa-flash" aria-hidden="true"></i>;
    default:
      return <i className="fa fa-flag" aria-hidden="true"></i>;

  }
}
