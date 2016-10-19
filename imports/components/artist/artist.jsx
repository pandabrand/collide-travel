import React from 'react';

import ArtistHeaderComponent from './artist-header.jsx';
import ArtistMapAndTableComponent from './artist-map-and-table.jsx';
import ArtistSoundcloudComponent from './soundcloud.jsx';
import TrendingContainer from '/imports/containers/trending.jsx';
import RelatedArtistsComponent from './relatedArtists.jsx';
import {createMarkup, removeHTMLTags, cloudinaryURL} from '/lib/utils.js';

const serveStickyAd = (ads) => {
  const takeoverAd = ads ? ads.takeoverAd : null;
  const showAd = ads ? ads.showAdTakeover : false;
  const ad = (takeoverAd && takeoverAd.length > 0 && showAd) ? <div><div id="sticky-anchor"></div><div id="sticky-ad" className="banner-ad fluid-container ad-container"><div dangerouslySetInnerHTML={createMarkup(takeoverAd)}/></div></div> : '';
  return ad;
}

const serveTakeoverAd = (ads) => {
  const takeoverAd = ads ? ads.takeoverAd : null;
  const showAd = ads ? ads.showAdTakeover : false;
  const ad = (takeoverAd && takeoverAd.length > 0 && showAd) ? <div className="banner-ad fluid-container ad-container"><div dangerouslySetInnerHTML={createMarkup(takeoverAd)}/></div> : '';
  return ad;
}


const getArtistGuide = (artist, homeCity, locations, artistComments, relatedArtists, ads, props, dispatch) => {
  const social_title = 'Collide Travel - ' + artist.artistName + ': Guide to ' + homeCity.displayName;
  const social_description = removeHTMLTags(artist.description).substring(0,154);
  const social_url = Meteor.absoluteUrl() + FlowRouter.current().path;
  const social_image = cloudinaryURL(artist.image);

  const fb_url = {property:'og:url', content:social_url};
  const fb_title = {property:'og:title', content:social_title};
  const fb_description = {property:'og:description', content:social_description};
  const fb_image = {property:'og:image', content: social_image};
  const twitter_card = {name:'twitter:card', content:social_description};
  const twitter_title = {name:'twitter:title', content:social_title};
  const twitter_description = {name:'twitter:description', content:social_description};
  const twitter_url = {name:'twitter:url', content:social_url};

  DocHead.setTitle(social_title);
  DocHead.addMeta(fb_url);
  DocHead.addMeta(fb_title);
  DocHead.addMeta(fb_description);
  DocHead.addMeta(fb_image);
  DocHead.addMeta(twitter_card);
  DocHead.addMeta(twitter_title);
  DocHead.addMeta(twitter_description);
  DocHead.addMeta(twitter_url);


  return <div id="main" className="artists-container">
          <ArtistHeaderComponent artist={artist} homeCity={homeCity}/>
          {serveStickyAd(ads)}
          <ArtistMapAndTableComponent artist={artist} homeCity={homeCity} locations={locations} artistComments={artistComments} dispatch={dispatch} props={props}/>
          <ArtistSoundcloudComponent artist={artist}/>
          {serveTakeoverAd(ads)}
          <TrendingContainer/>
          <RelatedArtistsComponent artists={relatedArtists} homeCity={homeCity} />
         </div>;
}

export const ArtistGuideComponent = ( {artist, homeCity, locations, artistComments, relatedArtists, ads, props, dispatch} ) =>
(
  <div>{getArtistGuide(artist, homeCity, locations, artistComments, relatedArtists, ads, props, dispatch)}</div>
);
