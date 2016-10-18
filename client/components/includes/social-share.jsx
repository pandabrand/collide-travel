import React, {PropTypes, Component} from 'react';
import {FacebookButton, PinterestButton,TwitterButton, TumblrButton} from 'react-social';
import {createMarkup, cloudinaryURL} from '../../lib/utils.js';

const getCCPath = (artist, city) => {
  let path = '';
  if(!artist) {
    path = FlowRouter.path('city-guide', {name:city.cityName});
  } else {
    path = FlowRouter.path('artist-guide', {name:city.cityName, artistName:artist.artistSlug});
  }
  const url = Meteor.absoluteUrl(path);
  return url;
}

const getCCMessage = (artist,city) => {
  let message = '';
  if(!artist) {
    message = 'Travel Collide guide to ' + city.displayName + ' and more.';
  } else {
    message = artist.artistName + ': Guide to ' + city.displayName + ' and more at Travel Collide.';
  }
  return message;
}

const getCCMedia = (artist,city) => {
  let mediaURL = '';
  if(!artist) {
    mediaURL = cloudinaryURL(city.guidePreview);
  } else {
    mediaURL = cloudinaryURL(artist.image);
  }
  return mediaURL;
}

export default class SocialShareComponent extends Component {

    constructor(props) {
      super(props);
    }

  twitterLink = (artist, city) => {
    const twitterURL =  'https://twitter.com/intent/tweet?text='+getCCMessage(artist,city)+'&url='+getCCPath(artist,city);

  	return twitterURL;
  }

  facebookLink = (artist, city) => {
    const path = 'https://www.facebook.com/dialog/share?display=popup';
    const message = getCCMessage(artist,city);
    const media = getCCMedia(artist,city);
    const facebookShareURL = getCCPath(artist,city);
    // const facebookShareLink = path + '&href=' + facebookShareURL + '&link=' + facebookShareURL + '&caption=' + message + '&redirect_uri=' + 'https://www.facebook.com';
    const facebookShareLink = path + '&href=' + facebookShareURL + '&link=' + facebookShareURL + '&redirect_uri=' + 'https://www.facebook.com';
  	return facebookShareLink;
  }

  pinterestLink = (artist, city) => {
    const path = 'https://www.pinterest.com/pin/create/button/?url=';
    const frpath = getCCPath(artist,city);
    //add &media = imgSrc soon.
    const description = '&description='+getCCMessage(artist,city);
    const pintrestURL = path + frpath + description;

  	return pintrestURL;
  }

  tumblrLink = (artist, city) => {
    const path = 'http://tumblr.com/widgets/share/tool?canonicalUrl=';
    const frpath = getCCPath(artist,city);
    const title = '&title=' + getCCMessage(artist,city);
    const tumblrURL = path + frpath + title;
    return tumblrURL;
  }

  popit = (url) => {
    const w=350,h=200,left = Number((screen.width/2)-(w/2)), tops = Number((screen.height/2)-(h/2)),
    newwindow=window.open(url,'name','height='+h+',width='+w+',top='+tops+'left='+left);
    if (window.focus) {newwindow.focus()}
  	return false;
  }

  render() {
    const {artist, city} = this.props;
    const url = getCCPath(artist,city);
    const message = getCCMessage(artist,city);
    const media = getCCMedia(artist,city);
    return (
      <div className="popover-social-icons">
        <TwitterButton url={url} message={message} element={'a'}><i className="fa fa-twitter"></i></TwitterButton>
        {/*<FacebookButton url={url} message={message} element={'a'} appId={'1247963348571465'} sharer={'true'}><i className="fa fa-facebook"></i></FacebookButton>*/}
        <a href={this.facebookLink(artist,city)} target="_blank"><i className="fa fa-facebook"></i></a>
         {/*<a href="#" onClick="http://instagram.com/officialculturecollide" target="_blank" className="external"><i className="fa fa-instagram"></i></a>*/}
        <PinterestButton url={url} message={message} element={'a'} media={media}><i className="fa fa-pinterest"></i></PinterestButton>
        <TumblrButton url={url} message={message} element={'a'} media={media}><i className="fa fa-tumblr"></i></TumblrButton>
      </div>
    );
  }
}
