import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { PagesCollection } from '../../lib/collections/pages.js';
import { HomeComponent } from '../components/home/home.jsx';
import { LocationsCollection } from '../../lib/collections/locations.js';
import { ArtistsCollection } from '../../lib/collections/artists.js';
import { ArtistCommentsCollection } from '../../lib/collections/artist-comments.js';
import { AdZoneCollection } from '../../lib/collections/ad-zone.js';
import SpinnerComponent from '../components/includes/spinner.jsx';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('featured-cities');
  const homePage_sub = Meteor.subscribe('home-page', true);
  const promoted_sub = Meteor.subscribe('promoted-city');
  const adSubscription = Meteor.subscribe('get-ad');

  if(subscription.ready() && homePage_sub.ready() && promoted_sub.ready() && adSubscription.ready()) {
    const featuredCities = CitiesCollection.find({isFeatured:true},{skip:0,limit:6}).fetch();

    const homePage = PagesCollection.findOne({isHome: true});

    const promotedCity = CitiesCollection.findOne({isPromoted: true});

    const ads = AdZoneCollection.findOne({});

    const artists_sub = Meteor.subscribe('artists-city-by-name', promotedCity.cityName);
    let locations = {};
    let artists = {};
    let artistComments = [];
    if(artists_sub.ready()) {
      artists = ArtistsCollection.find({cityName:promotedCity.cityName},{sort:{artistName:1}}).fetch();

      const locations_sub = Meteor.subscribe('locations', promotedCity._id);
      if(locations_sub.ready()) {
          locations = LocationsCollection.find({cityId:promotedCity._id},{sort:{isFeatured:-1,name: 1}}).fetch();

          const ac_sub = Meteor.subscribe('all-artist-comments');
          if(ac_sub.ready()) {
            for(let x = 0; x < artists.length; x++) {
              const _comm = ArtistCommentsCollection.find({artistId: artists[x]._id}).fetch();
              for(let y = 0; y < _comm.length; y++) {
                artistComments.push(_comm[y]);
              }
            }

            const homeData = {homePage, featuredCities, promotedCity, locations, artists, artistComments, ads, props}
            onData(null, homeData);
          }
      }
    }



  }
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


export default HomeContainer = connect(mapStateToProps)(composeWithTracker(composer, SpinnerComponent)(HomeComponent));
