import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
// import { DocHead } from 'dochead';

export default class UIHeaderComponent extends Component {
  componentWillMount = () => {
    const title = 'Travel Collide';
    DocHead.setTitle(title);
    const charset = {charset: 'utf-8'};
    DocHead.addMeta(charset);
    const http_content = {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'};
    DocHead.addMeta(http_content);
    const viewport = {name: 'viewport', content: 'width=device-width, initial-scale=1'};
    DocHead.addMeta(viewport);

    // <!-- Open Graph Meta Tags -->
    const fb_type = {property:'og:type', content:'website'};
    const fb_title = {property:'og:title', content:'Travel Collide'};
    const fb_description = {property:'og:description', content:'Get out of town'};
    const fb_site_name = {property:'og:site_name', content:'Travel Collide'};
    const fb_url = {property:'og:url', content:'https://www.facebook.com/culturecollideofficial/'};
    DocHead.addMeta(fb_type);
    DocHead.addMeta(fb_title);
    DocHead.addMeta(fb_description);
    DocHead.addMeta(fb_site_name);
    DocHead.addMeta(fb_url);
    // const fb_image = {property:'og:image', content:''};

    // <!-- Twitter Card Meta Tags -->
    const twitter_card = {name:'twitter:card', content:'summary'};
    const twitter_title = {name:'twitter:title', content:'Travel Collide'};
    const twitter_description = {name:'twitter:description', content:'Get out of town.'};
    // const twitter_card = {name:'twitter:image', content:'url'};
    const twitter_site = {name:'twitter:site', content:'@culturecollide'};
    DocHead.addMeta(twitter_card);
    DocHead.addMeta(twitter_title);
    DocHead.addMeta(twitter_description);
    DocHead.addMeta(twitter_site);

    // <meta name="twitter:creator" content="@{{userTwitter user.profile.twitterHandle}}"/>

  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-static-top navbar-collide-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand-collide navbar-brand" href={FlowRouter.path('home')}>
              <img src="/image/new-logo.png" srcSet="/images/new-logo.png 1x, /images/new-logo@2x.png"/>
            </a>
          </div>
          <div id="navbar" className="collapse navbar-collapse navbar-collide-collapse">
            <ul className="nav navbar-nav navbar-right navbar-social-search">
              <div className="social-icons">
                <a href="http://twitter.com/@culturecollide" target="_blank" className="external"><i className="fa fa-twitter"></i></a>
                <a href="http://facebook.com/culturecollideofficial" target="_blank" className="external"><i className="fa fa-facebook"></i></a>
                <a href="http://instagram.com/officialculturecollide" target="_blank" className="external"><i className="fa fa-instagram"></i></a>
                <a href="http://www.pinterest.com/culturecollide" target="_blank" className="external"><i className="fa fa-pinterest"></i></a>
                <a href="http://youtube.com/culturecollide" target="_blank" className="external"><i className="fa fa-youtube"></i></a>
                <a href="http://culturecollideofficial.tumblr.com&#9;" target="_blank" className="external"><i className="fa fa-tumblr"></i></a>
                <a href="https://open.spotify.com/user/culturecollide" target="_blank" className="external"><i className="fa fa-spotify"></i></a>
                <a href="/rss/rss" target="_blank" className="external"><i className="fa fa-rss"></i></a>
              </div>
              <li>
                <form className="navbar-form navbar-right" role="search">
                  <div className="form-group icon-addon">
                    <i className="fa fa-search"></i>
                    <input type="text" className="form-control navbar-search-bar" placeholder="Search"></input>
                  </div>
                </form>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right navbar-collide-menu">
              <li><a href="/city-guides">City Guides</a></li>
              <li><a href="/trending">Trending</a></li>
              <li><a href="/in-print">In Print</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/contests">Contests</a></li>
              <li><a href="/newsletters">Newsletters</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right navbar-social-search navbar-mobile-social-search">
              <div className="social-icons">
                <a href="http://twitter.com/@culturecollide" target="_blank" className="external"><i className="fa fa-twitter"></i></a>
                <a href="http://facebook.com/culturecollideofficial" target="_blank" className="external"><i className="fa fa-facebook"></i></a>
                <a href="http://instagram.com/officialculturecollide" target="_blank" className="external"><i className="fa fa-instagram"></i></a>
                <a href="http://www.pinterest.com/culturecollide" target="_blank" className="external"><i className="fa fa-pinterest"></i></a>
                <a href="http://youtube.com/culturecollide" target="_blank" className="external"><i className="fa fa-youtube"></i></a>
                <a href="http://culturecollideofficial.tumblr.com&#9;" target="_blank" className="external"><i className="fa fa-tumblr"></i></a>
                <a href="https://open.spotify.com/user/culturecollide" target="_blank" className="external"><i className="fa fa-spotify"></i></a>
                <a href="/rss/rss" target="_blank" className="external"><i className="fa fa-rss"></i></a>
              </div>
              <li>
                <form className="navbar-form navbar-right" role="search">
                  <div className="form-group icon-addon">
                    <i className="fa fa-search"></i>
                    <input type="text" className="form-control navbar-search-bar" placeholder="Search"></input>
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
