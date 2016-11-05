import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import {createMarkup} from '/lib/utils.js';
import store from '/lib/store/store.js';
import { connect } from 'react-redux';
import setMobileMenuClick from '/lib/actions/set-mobile-menu-click.js';

export default class UIHeaderComponent extends Component {

  componentDidMount = () => {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount = () => {
    this.unsubscribe();
  }

  searchHandler = (event) => {
    if(event.keyCode === 13) {
      event.preventDefault();
      let search = document.getElementById('searchBar');
      let searchValue = search.value;
      if(searchValue.length > 0) {
        let path = FlowRouter.path('search', {search:searchValue});
        return FlowRouter.go(path);
      }
    }
  }

  render() {
    const {ads} = this.props;
    const state = store.getState();
    const topAd = ads ? ads.topAd : null;
    const showTopAd = ads ? ads.showTopBannerAd : false;
    const mobileButtonClasses = state.mobileMenuClick ? 'navbar-toggle c-hamburger c-hamburger--htx is-active' : 'navbar-toggle c-hamburger c-hamburger--htx';
    const ad = (topAd && topAd.length > 0 && showTopAd) ? <div className="banner-ad fluid-container ad-container"><div dangerouslySetInnerHTML={createMarkup(topAd)}/></div> : '';


    return (
      <div className="nav-wrapper">
      {ad}
      <nav className="navbar navbar-inverse navbar-collide-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" onClick={() => {return store.dispatch(setMobileMenuClick(!state.mobileMenuClick))}} className={mobileButtonClasses} data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span>Toggle navigation</span>
            </button>
            <a className="navbar-brand-collide navbar-brand" href={FlowRouter.path('home')}>
              <img src="/image/new-logo.png" className="img-responsive" srcSet="/images/new-logo.png 1x, /images/new-logo@2x.png"/>
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
                    <input type="text" id="searchBar" className="form-control navbar-search-bar" placeholder="Search" onKeyDown={this.searchHandler}></input>
                  </div>
                </form>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right navbar-collide-menu">
              <li><a href="/city-guides">City Guides</a></li>
              <li><a href="http://www.culturecollide.com/feed/" target="_blank">Trending</a></li>
              <li><a href="http://www.culturecollide.com/festivals/">Events</a></li>
              <li><a href="http://www.culturecollide.com/contests/">Contests</a></li>
              <li><a href="/newsletters">Newsletters</a></li>
              <li><a href="/about">About</a></li>
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
      </div>
    );
  }
}
