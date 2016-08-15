import React, {Component} from 'react';

import PrintElementComponent from './print-element.jsx';

const renderPrintElements = (cities) => {
  return cities.map((print, i) => {
    return <PrintElementComponent key={i} print={print}/>;
  });
}

export default function PrintPageComponent({cities}) {
  return(<div id="main" className="container">
      <h1>In Print</h1>
      <div className="page-copy">
        <p>This 10” x 12” book explores the intersection of music and travel, with tips, tour diaries, stories from the road, food recommendations, and musings on world travel, straight from the artists themselves.</p>
        <p>Fill out the form below to receive a free download, or purchase a physical copy for $14.95 + tax:</p>
      </div>
      <div className="print-gallery row">
        {renderPrintElements(cities)}
      </div>
    </div>);
};
