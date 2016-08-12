import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

class ExploreBarComponent extends Component {
  constructor(props) {
    super();
    // this.state = {value: ''};
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.initJQueryWidgets();
  }

  initJQueryWidgets() {
    var self = this;
    var cityNode = this.refs.cityselect
    $(document).ready( function() {
      $('#artist-select,#category-select').select2();
      $(cityNode).select2({change: this.handleChange});
      // $('#city-select').on("select2:select", function (e) { var _val = e.params.data.element.dataset.value; FlowRouter.go('/city/:name', JSON.parse(_val)); });
      $('#artist-select').on("select2:select", function (e) { var _val = e.params.data.element.dataset.value; FlowRouter.go('/city/:name/artist/:artistName', JSON.parse(_val)); });
      $('#category-select').on("select2:select", function (e) { var _val = e.params.data.element.dataset.value; FlowRouter.go('/category/:type', JSON.parse(_val)); });
    });
  }

  handleChange = (event) => {
    this.setState({value:event.target.value});
    console.log('state: ' + this.state.value);
  }

  render() {
    const cities = this.props.cities;
    return(
      <div className="explore-bar">
        <form name="explore-bar-form">
          <div className="form-group">
            <select id="city-select" ref="cityselect" value={this.props.value} onChange={this.handleChange} name="city" className="form-control explore-select">
              <option value="0">Explore a City</option>
              {cities.map(
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
