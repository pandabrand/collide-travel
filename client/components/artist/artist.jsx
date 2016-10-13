import React from 'react';

import ArtistHeaderComponent from './artist-header.jsx';
import ArtistMapAndTableComponent from './artist-map-and-table.jsx';
import ArtistSoundcloudComponent from './soundcloud.jsx';
import TrendingContainer from '../../containers/trending.jsx';
import RelatedArtistsComponent from './relatedArtists.jsx';
import {createMarkup, removeHTMLTags, cloudinaryURL} from '../../lib/utils.js';

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
  DocHead.setTitle(social_title);
  const fb_url = {property:'og:url', content:'https://www.collidetravel.com'+FlowRouter.current().path};
  const fb_title = {property:'og:title', content:social_title};
  const fb_description = {property:'og:description', content:removeHTMLTags(artist.description).substring(0,154)};
  DocHead.addMeta(fb_url);
  DocHead.addMeta(fb_title);
  DocHead.addMeta(fb_description);

  // SEO.set({
  //   title: social_title,
  //   description: removeHTMLTags(artist.description).substring(0,154),
  //   meta: {
  //     'property="og:image"': cloudinaryURL(artist.image, 500, 500),
  //     'property="og:title"': social_title,
  //     'name="twitter:title"':social_title,
  //   }
  // });


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
