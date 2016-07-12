import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class UIHeader extends Component {
  render() {
    return (
      <header id="header">
        <div className="navbar-inner not-navbar-fixed-top">
          <div id="top-img-wrapper" className="banner-img-wrapper">
          </div>

          <div id="navbar-wrapper">
            <div className="container">
              <div className="innerContainer">
                <nav className="navbar yamm navbar-custom" role="navigation">
                  <a href="/" className="navbar-brand">
                    <img src="/image/new-logo.png" srcSet="/images/new-logo.png 1x, /images/new-logo@2x.png" width="225"/>
                    <div className="clear"></div>
                  </a>

                  <div className="navbar-header page-scroll">
                    <button type="button" className="js-mobile-menu-trigger navbar-toggle">
                      <svg version="1.1" viewBox="0 0 32 20" height="20px" width="32px">
    										<g className="menu-icon-svg" fill="#FFFFFF">
    											<rect height="5.26315789" width="32" y="0" x="0"></rect>
    											<rect height="5.26315789" width="32" y="7.36842105" x="0"></rect>
    											<rect height="5.26315789" width="32" y="14.7368421" x="0"></rect>
    										</g>
    									</svg>
                    </button>
                  </div>
                  <div className="collapse navbar-collapse navbar-main-collapse">

      						<div>
      							<ul className="nav nav-pills socialSearch">
      								<li>
      									<div className="headerSocials">
      										<a href="http://twitter.com/@culturecollide" target="_blank" className="external twLink"></a>
      										<a href="http://facebook.com/culturecollideofficial" target="_blank" className="external fbLink"></a>
      										<a href="http://instagram.com/officialculturecollide" target="_blank" className="external igLink"></a>
      										<a href="http://www.pinterest.com/culturecollide" target="_blank" className="external pLink"></a>
      										<a href="http://youtube.com/culturecollide" target="_blank" className="external ytLink"></a>
      										<a href="http://culturecollideofficial.tumblr.com&#9;" target="_blank" className="external tLink"></a>
      										<a href="https://open.spotify.com/user/culturecollide" target="_blank" className="external sLink"></a>
      										<a href="/rss/rss" target="_blank" className="external rssLink"></a>
      									</div>
      								</li>

      								<li className="searchWrap">
      									<form id="searchform" className="navbar-form navbar-right" method="post" action="http://www.culturecollide.com/">
                        <div className="hiddenFields">
                        </div>
      										<div className="form-group">
      											<input type="text" className="form-control" placeholder="" name="keywords" id="keywords"/>
      										</div>
      										<button type="submit" className="btn btn-default hidden">Submit</button>
      									</form>
      								</li>

      							</ul>
      						</div>
      							<ul className="nav nav-pills">
      								<li><a href="/city-guides">City Guides</a></li>
      								<li><a href="/trending/">Trending</a></li>
      								<li><a href="/in-print/">In Print</a></li>
                      <li><a href="/events/">Events</a></li>
      								<li><a href="/contests/">Contests</a></li>
      								<li><a href="/newsletters/">Newsletters</a></li>
      							</ul>
      						</div>
                </nav>
              </div>
            </div>
          </div>

        </div>
      </header>

    );
  }
}
