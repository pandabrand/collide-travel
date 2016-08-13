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
