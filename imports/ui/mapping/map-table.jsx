import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import MapRow from './map-row.jsx';

export default class MapTable extends Component {
  render() {
    let names = ['Restaurant','Bar','Gallery','PopUp Shop','NightClub','Food Truck'];
    return (
      <table className="table table-hover">
      <tbody>
        {names.map(function(name,i){
          return (<MapRow key={i} name={name} imgId={i+1}/>)
        })}
      </tbody>
      </table>
    );
  }
}
