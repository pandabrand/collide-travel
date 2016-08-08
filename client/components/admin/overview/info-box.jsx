import React from 'react';

const getCollectionInfoBox = (info) => {
  return <div className="collection-info-box">
      <div className="collection-info-header">{info.name}</div>
      <div className="collection-info-details">
        {info.count}
        <span>{info.name}s</span>
      </div>
      <div className="collection-info-link"><a href={FlowRouter.path(info.editRoute)}>View more <i className="fa fa-info-circle"/></a></div>
    </div>;
}

export default CollectionInfoBox = ({info}) =>
( <div className="col-xs-6 col-sm-4 collection-info">{getCollectionInfoBox(info)}</div> );
