import React, {Component} from 'react';

import Magazine from '../../containers/magazine.jsx';

export default class PrintPage extends Component {

  getPrints() {
    return [
      { _id: 1, issue: 1, featured: 'Animal Collective (Lisbon/LA/D.C.), YACHT (Los Angeles), HINDS (Madrid), Andrew W.K. & Lil BUB (The Universe), Poliça (Minneapolis), Santigold (LA/NYC/Jamaica/Tanzania), Miike Snow (Stockholm), Eleanor Friedberger (New York), SWIMM, Dan Deacon (Baltimore), Belle & Sebastian and Franz Ferdinand (Glasgow), MØ (Copenhagen), Nova Heart (Beijing), and so many more.',
        download: true, purchase: true, preview: 'http://lorempixel.com/300/357/transport/',
      },
      { _id: 2, issue: 2, featured: 'Animal Collective (Lisbon/LA/D.C.), YACHT (Los Angeles), HINDS (Madrid), Andrew W.K. & Lil BUB (The Universe), Poliça (Minneapolis), Santigold (LA/NYC/Jamaica/Tanzania), Miike Snow (Stockholm), Eleanor Friedberger (New York), SWIMM, Dan Deacon (Baltimore), Belle & Sebastian and Franz Ferdinand (Glasgow), MØ (Copenhagen), Nova Heart (Beijing), and so many more.',
        download: true, purchase: false, preview: 'http://lorempixel.com/300/357/transport/',
      },
      { _id: 3, issue: 3, featured: 'Animal Collective (Lisbon/LA/D.C.), YACHT (Los Angeles), HINDS (Madrid), Andrew W.K. & Lil BUB (The Universe), Poliça (Minneapolis), Santigold (LA/NYC/Jamaica/Tanzania), Miike Snow (Stockholm), Eleanor Friedberger (New York), SWIMM, Dan Deacon (Baltimore), Belle & Sebastian and Franz Ferdinand (Glasgow), MØ (Copenhagen), Nova Heart (Beijing), and so many more.',
        download: true, purchase: true, preview: 'http://lorempixel.com/300/357/transport/',
      },
      { _id: 4, issue: 4, featured: 'Animal Collective (Lisbon/LA/D.C.), YACHT (Los Angeles), HINDS (Madrid), Andrew W.K. & Lil BUB (The Universe), Poliça (Minneapolis), Santigold (LA/NYC/Jamaica/Tanzania), Miike Snow (Stockholm), Eleanor Friedberger (New York), SWIMM, Dan Deacon (Baltimore), Belle & Sebastian and Franz Ferdinand (Glasgow), MØ (Copenhagen), Nova Heart (Beijing), and so many more.',
        download: false, purchase: true, preview: 'http://lorempixel.com/300/357/transport/',
      },
      { _id: 5, issue: 5, featured: 'Animal Collective (Lisbon/LA/D.C.), YACHT (Los Angeles), HINDS (Madrid), Andrew W.K. & Lil BUB (The Universe), Poliça (Minneapolis), Santigold (LA/NYC/Jamaica/Tanzania), Miike Snow (Stockholm), Eleanor Friedberger (New York), SWIMM, Dan Deacon (Baltimore), Belle & Sebastian and Franz Ferdinand (Glasgow), MØ (Copenhagen), Nova Heart (Beijing), and so many more.',
        download: false, purchase: false, preview: 'http://lorempixel.com/300/357/transport/',
      },
    ];
  }

  renderPrintElements() {
    return this.getPrints().map((print) => (
      <Magazine key={print._id} print={print}/>
    ));
  }

  render() {
    return (
      <div id="main" className="container">
        <h1>In Print</h1>
        <div className="page-copy">
          <p>This 10” x 12” book explores the intersection of music and travel, with tips, tour diaries, stories from the road, food recommendations, and musings on world travel, straight from the artists themselves.</p>
          <p>Fill out the form below to receive a free download, or purchase a physical copy for $14.95 + tax:</p>
        </div>
        <div className="print-gallery row">
          {this.renderPrintElements()}
        </div>
      </div>
    );
  }
}
