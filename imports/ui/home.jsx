import React from 'react';

import SelectBar from './select-bar.jsx';

export const Home = () => (
  <div id="main">
    <img className="hero-image" src="http://lorempixel.com/g/1210/480/nature/1/Dummy-Text" />
    <div className="hero-text">
      <div className="hero-title">This is where text will go.</div>
      <div className="hero-copy">Now we will have more text below.</div>
    </div>
    <SelectBar/>
  </div>
);
