import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import DashboardComponent from  './dashboard.jsx';
import CollectionInfoBox from './overview/info-box.jsx';

const getOverviewTable = (artists,cities,locations,events,pages,props) => {
  const artinfo = {'count':artists.length, 'name':'Artist','editRoute':'edit-artist'};
  const cityinfo = {'count':cities.length, 'name':'City','editRoute':'edit-city'};
  const locationinfo = {'count':locations.length, 'name':'Location','editRoute':'edit-location'};
  const eventinfo = {'count':events.length, 'name':'Event','editRoute':'edit-event'};
  const pageinfo = {'count':pages.length, 'name':'Page','editRoute':'edit-page'};
  return <div className="dashboard">
  <h1 className="page-header">Overview</h1>
  <div className="row item-stats">
    <CollectionInfoBox info={artinfo}/>
    <CollectionInfoBox info={cityinfo}/>
    <CollectionInfoBox info={locationinfo}/>
    <CollectionInfoBox info={eventinfo}/>
    <CollectionInfoBox info={pageinfo}/>
  </div>
  </div>;
}

export const OverviewTableComponent = ({artists,cities,locations,events,pages,props}) =>
(<DashboardComponent content={getOverviewTable(artists,cities,locations,events,pages,props)}/>);
