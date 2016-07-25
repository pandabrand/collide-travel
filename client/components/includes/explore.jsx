import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class ExploreBar extends Component {
  render(){
   return (
     <div className="explore-bar">
       <form>
         <form-group>
           <label>Explore a city: </label>
           <input type="text" value="" ref="city-search" placeholder="City..."/>
         </form-group>
         <form-group>
           <label>Search by artist: </label>
           <input type="text" value="" ref="artist-search" placeholder="Artist..."/>
         </form-group>
         <form-group>
           <label>Search by category: </label>
           <input type="text" value="" ref="category-search" placeholder="Category..."/>
         </form-group>
       </form>
     </div>
   );
 }
}
