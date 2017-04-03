import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '../../lib/collections/cities.js';
import { PagesCollection } from '../../lib/collections/pages.js';
import { HomeComponent }  from '../components/home/home.jsx';
import { LocationsCollection } from '../../lib/collections/locations.js';
import { ArtistsCollection } from '../../lib/collections/artists.js';
import { ArtistCommentsCollection } from '../../lib/collections/artist-comments.js';
import { AdZoneCollection } from '../../lib/collections/ad-zone.js';
import { Subs } from './subs.js';
import SpinnerComponent from '../components/includes/spinner.jsx';

const composer = (props, onData) => {
  const subscription = Subs.subscribe('featured-cities');
  const homePage_sub = Subs.subscribe('home-page', true);
  const promoted_sub = Subs.subscribe('promoted-city');
  const adSubscription = Subs.subscribe('get-ad');

  if(subscription.ready() && homePage_sub.ready() && promoted_sub.ready() && adSubscription.ready()) {
    const featuredCities = CitiesCollection.find({$or:[{isFeatured:true},{isDefault:true}]},{skip:0,limit:6, fields:{displayName:1,printPreview:1,cityName:1,isFeatured:1}}).fetch();

    const homePage = PagesCollection.findOne({isHome: true});

    const promotedCity = CitiesCollection.findOne({isPromoted: true}, {fields:{displayName:1,isPromoted:1,cityName:1}});

    const ads = AdZoneCollection.findOne({});

    const artists_sub = Subs.subscribe('artists-city-by-name', promotedCity.cityName);
    let locations = {};
    let artists = {};
    let artistComments = [];
    if(artists_sub.ready()) {
      artists = ArtistsCollection.find({cityName:promotedCity.cityName},{sort:{artistName:1},fields:{artistName:1,cityName:1,artistSlug:1,locationIds:1,isFeatured:1,color:1}}).fetch();

      const locations_sub = Subs.subscribe('city-id-locations', promotedCity._id);
      if(locations_sub.ready()) {
          locations = LocationsCollection.find({cityId:promotedCity._id},{sort:{isFeatured:-1,name: 1}}).fetch();

          const artistIds = _.pluck(artists, '_id');
          const ac_sub = Subs.subscribe('artist-comments-by-artist', artistIds);
          if(ac_sub.ready()) {
            const artistsComments = ArtistCommentsCollection.find({artistId: {$in: artistIds}}).fetch();
            for(let x = 0; x < artists.length; x++) {
              const _comm = _.where(artistsComments, {artistId: artists[x]._id});
              for(let y = 0; y < _comm.length; y++) {
                artistComments.push(_comm[y]);
              }
            }

            const homeData = {homePage, featuredCities, promotedCity, locations, artists, artistComments, ads, props}
            const google_description = {name:'description', content:'CollideTravel.com — a comprehensive guide to cities across the globe built on Google Maps.Through this platform, you can search by city or by artist to discover locals-approved destinations during your next trip.'};
            DocHead.addMeta(google_description);
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
    categoryExploreSelection: state.categoryExploreSelection,
    mapPosition: state.mapPosition,
    mobileMapRowPosition: state.mobileMapRowPosition,
  }
}


export default HomeContainer = connect(mapStateToProps)(composeWithTracker(composer, SpinnerComponent)(HomeComponent));
