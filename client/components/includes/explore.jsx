import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
// import shouldPureComponentUpdate from 'react-pure-render/function';
//
// import { CitiesCollection } from '../../../lib/collections/cities.js';
// import { LocationsCollection } from '../../../lib/collections/locations.js';
// import { ArtistsCollection } from '../../../lib/collections/artists.js';
//
// import setCitySelection from '../../../lib/client/actions/set-city-selection.js';
// import setArtistSelection from '../../../lib/client/actions/set-artist-selection.js';
// import setCategorySelection from '../../../lib/client/actions/set-category-selection.js';
//
// import Spinner from 'react-spinkit';

// const getExploreBar = (cities, locationCategories, artists, dispatch) => {
//
  // const gotoRoute = (pathRoot, e) => {
  //   selectEl = document.forms['explore-bar-form'].elements;
  //   for(let i = 0; i < selectEl.length; i++) {
  //     let el = selectEl[i];
  //     if(el.name !== e.target.name) {
  //       el.selectedIndex = 0;
  //     }
  //   }
  //   var selected = e.target.options[e.target.selectedIndex];
  //   FlowRouter.go(pathRoot,JSON.parse(selected.getAttribute('data-value')));
  // }
  //
//   if(cities && locationCategories) {
//       return <div className="explore-bar">
//         <form name="explore-bar-form">
//           <div className="form-group ">
//             <select id="city-select" name="city" onChange={(e) => {gotoRoute('/city/:name',e);}} className="form-control explore-select">
//             <option value='0'>Explore a city:</option>
//               {cities.map(
//                 function(city,i) {
//                   return <option data-value={JSON.stringify({'name':city.cityName})} value={city.cityName} key={i}>{city.displayName}</option>
//                 })
//               }
//             </select>
//           </div>
          // <div className="form-group">
          //   <select name="artist" onChange={(e) => { gotoRoute('/city/:name/artist/:artistName', e);}} className="form-control explore-select">
          //     <option value='0'>Search by artist:</option>
          //     {artists.map(
          //       function(artist,i) {
          //         return <option data-value={JSON.stringify({'artistName':artist.artistSlug,'name':artist.cityName})} value={artist._id} key={i}>{artist.artistName}</option>
          //       })
          //     }
          //   </select>
          // </div>
          // <div className="form-group">
          //   <select name="category" onChange={(e) => { gotoRoute('/category/:type', e)}} className="form-control explore-select">
          //   <option value='none'>Search by category:</option>
          //     {locationCategories.map(
          //       function(category,i) {
          //         return <option data-value={JSON.stringify({'type':category})} value={category} key={i}>{category}</option>
          //       })
          //     }
          //   </select>
          // </div>
//         </form>
//       </div>;
//   } else {
//     return <Spinner spinnerName='cube-grid'/>;
//   }
// }
//
// export const ExploreBarComponent = ({cities, locationCategories, artists, dispatch}) => (
//  <div className="bottom-border">{getExploreBar(cities, locationCategories, artists, dispatch)}</div>
// );

class ExploreBarComponent extends Component {
  constructor(props) {
    super();
    this.state = props;
  }

  componentDidMount() {
    this.initJQueryWidgets();
  }

  initJQueryWidgets() {
    $(document).ready( function() {
      $('#city-select,#artist-select,#category-select').select2();
      $('#city-select').on("select2:select", function (e) { var _val = e.params.data.element.dataset.value; FlowRouter.go('/city/:name', JSON.parse(_val)); });
      $('#artist-select').on("select2:select", function (e) { var _val = e.params.data.element.dataset.value; FlowRouter.go('/city/:name/artist/:artistName', JSON.parse(_val)); });
      $('#category-select').on("select2:select", function (e) { var _val = e.params.data.element.dataset.value; FlowRouter.go('/category/:type', JSON.parse(_val)); });
    });
  }

  render() {
    return(
      <div className="explore-bar">
        <form name="explore-bar-form">
          <div className="form-group">
            <select id="city-select" name="city" className="form-control explore-select">
              <option value="0">Explore a City</option>
              {this.props.cities.map(
                 function(city,i) {
                   return <option data-value={JSON.stringify({'name':city.cityName})} value={city.cityName} key={i}>{city.displayName}</option>
                 })
               }
            </select>
          </div>
          <div className="form-group">
            <select id="artist-select" name="artist" className="form-control explore-select">
              <option value='0'>Search by artist:</option>
              {this.props.artists.map(
                function(artist,i) {
                  return <option data-value={JSON.stringify({'artistName':artist.artistSlug,'name':artist.cityName})} value={artist._id} key={i}>{artist.artistName}</option>
                })
              }
            </select>
          </div>
          <div className="form-group">
            <select id="category-select" name="category" className="form-control explore-select">
            <option value='none'>Search by category:</option>
              {this.props.locationCategories.map(
                function(category,i) {
                  return <option data-value={JSON.stringify({'type':category})} value={category} key={i}>{category}</option>
                })
              }
            </select>
          </div>
        </form>
      </div>
    );
  }
}

ExploreBarComponent.propTypes = {
  cities: React.PropTypes.array,
  artists: React.PropTypes.array,
  categories: React.PropTypes.array,
}

export default ExploreBarComponent;
