import React from 'react';
import { connect } from 'react-redux';

import SelectBar from '../includes/select-bar.jsx';
import HomeCityContainer from '../../containers/home-city.jsx';

function Home(props) {
  return (
    <div id="main">
      <img className="hero-image" src="http://lorempixel.com/g/1210/480/nature/1/Dummy-Text" />
      <div className="hero-text">
        <div className="hero-title">This is where text will go.</div>
        <div className="hero-copy">Now we will have more text below.</div>
      </div>
      <SelectBar/>
      <HomeCityContainer {...props}/>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    markerCirlceHover: state.markerCirlceHover,
    mapTableHover: state.mapTableHover,
    mapTableRowClick: state.mapTableRowClick,
    cityExploreSelection: state.cityExploreSelection,
    artistExploreSelection: state.artistExploreSelection,
    categoryExploreSelection: state.categoryExploreSelection
  }
}

export default connect(mapStateToProps)(Home);
