import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { composeWithTracker } from 'react-komposer';
import { CitiesCollection } from '/lib/collections/cities.js';
import { LocationsCollection } from '/lib/collections/locations.js';
import { ArtistsCollection } from '/lib/collections/artists.js';
import { ArtistCommentsCollection } from '/lib/collections/artist-comments.js';
import { AdZoneCollection } from '/lib/collections/ad-zone.js';
import { ArtistGuideComponent } from '/imports/components/artist/artist.jsx';
import SpinnerComponent from '/imports/components/includes/spinner.jsx';
import { Subs } from '/imports/containers/subs.js';
import {createMarkup, removeHTMLTags, cloudinaryURL} from '/lib/utils.js';

const composer = (props, onData) => {
  const subscription = Subs.subscribe('find-city',props.name);
  const artist_sub = Subs.subscribe('artist-name', props.artistName);
  const adSubscription = Subs.subscribe('get-ad');
  let homeCity = {};
  let locations = {};
  let artist = {};
  let artistComments = {};
  let relatedArtists = [];

  if(subscription.ready() && artist_sub.ready() && adSubscription.ready()) {
    homeCity = CitiesCollection.findOne({cityName:props.name});
    artist = ArtistsCollection.findOne({artistSlug:props.artistName});
    ads = AdZoneCollection.findOne({});
    const locations_sub = Subs.subscribe('artist-locations', artist.locationIds);
    if(locations_sub.ready()) {
        locations = LocationsCollection.find({_id: {$in: artist.locationIds}}).fetch({},{sort: {isFeatured: -1, name: 1}});

        const comments_sub = Subs.subscribe('artist-comments', artist._id);
        const related_sub = Subs.subscribe('artist-related', artist._id, artist.cityId);

        if (comments_sub.ready() && related_sub.ready()) {
          artistComments = ArtistCommentsCollection.find({artistId: artist._id}).fetch();
          relatedArtists = ArtistsCollection.find({ _id: { $nin: [artist._id] }, cityId: artist.cityId },{sample:{size:3},limit:3}).fetch();

          const homeData = {homeCity, locations, artist, artistComments, relatedArtists, ads, props}

          const social_title = 'Collide Travel - ' + artist.artistName + ': Guide to ' + homeCity.displayName;
          const social_description = removeHTMLTags(artist.description).substring(0,154);
          const current_url = FlowRouter.current();
          const social_url = FlowRouter.url(current_url.route.path, current_url.params, {});
          const social_image = cloudinaryURL(artist.image, 600, 315, 'fill', 'auto', 2.0);
          const fb_url = {property:'og:url', content:social_url};
          const fb_type = {property:'og:type', content:'profile'};
          const fb_title = {property:'og:title', content:social_title};
          const fb_description = {property:'og:description', content:social_description};
          const fb_image = {property:'og:image', content: social_image};
          const twitter_card = {name:'twitter:card', content:social_description};
          const twitter_title = {name:'twitter:title', content:social_title};
          const twitter_description = {name:'twitter:description', content:social_description};
          const twitter_url = {name:'twitter:url', content:social_url};
          const google_description = {name:'description', content:social_description};

          DocHead.setTitle(social_title);
          DocHead.addMeta(fb_type);
          DocHead.addMeta(fb_url);
          DocHead.addMeta(fb_title);
          DocHead.addMeta(fb_description);
          DocHead.addMeta(fb_image);
          DocHead.addMeta(twitter_card);
          DocHead.addMeta(twitter_title);
          DocHead.addMeta(twitter_description);
          DocHead.addMeta(twitter_url);
          DocHead.addMeta(google_description);
          onData(null, homeData);
        }
    }
  }

};

function mapStateToProps(state) {
  return {
    markerCirlceHover: state.markerCirlceHover,
    mapTableHover: state.mapTableHover,
    mapTableRowClick: state.mapTableRowClick,
    artistExploreSelection: state.artistExploreSelection,
    categoryExploreSelection: state.categoryExploreSelection,
    mapLocationClick: state.mapLocationClick,
    mapPosition: state.mapPosition,
    mobileMapRowPosition: state.mobileMapRowPosition,
  }
}

export default ArtistGuideContainer = connect(mapStateToProps)(composeWithTracker(composer, SpinnerComponent)(ArtistGuideComponent));
