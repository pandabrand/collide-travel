import React from 'react';
import { Session } from 'meteor/session';

import TrendingContainer from '../../containers/trending.jsx';

const getAbout = () => {
  return (<div className="container-fluid cc-container">
    <div className="row">
      <div className="col-md-12">
        <h1>About Us</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-md-8 col-sm-12">
        <div className="aboutBody">
          <p>Established in 2014, COLLiDE is a boutique culture agency, editorial platform, travel magazine, international festival, and experiential event production company founded by industry veteran Alan Miller. </p>
          <p>COLLiDE is based in Los Angeles, New York and Chicago, with partner offices in Mexico City, Montreal, Toronto, and Vancouver. </p>
          <p>Our mission is to advance culture, by building and executing marketing strategies for top brands and company passion projects.  </p>
          <h4>About COLLiDE Agency</h4>
          <p>COLLiDE is a boutique culture agency which has created a dynamic, forward-thinking model of business. Building on their decade-plus foundation of cross-cultural marketing experience, the COLLiDE agency sets a new charter for brands to explore. COLLiDE specializes in full brand integration. Current COLLiDE agency clients include DIRECTV, Dr Martens, E&J Gallo, SILVERCAR, Landmark Theatres, Hard Rock Hotels  and many others. For more information on integrated brand campaigns visit our agency site: weareCOLLiDE.com</p>
          <h4>About COLLiDE travel </h4>
          <p>COLLiDE travel is comprehensive guides to cities across the globe curated by leading artists and tastemakers from around the world, built on Google Maps, and in the form of digital magazines and printed booklets. </p>
          <p>Twice a year, the city guides and artist inspiration takes the form of a quarterly book entitled Travel with Purpose. Books are available at participating hotels including Hard Rock, Graduate, and select boutique properties throughout the U.S.</p>
          <h3>ABOUT OUR EVENTS</h3>
          <h4>COLLiDE On Rainey</h4>
          <p>A main attraction at Austin’s SXSW festival, each year COLLiDE takes over Rainey Street for three days of nonstop music from today’s most highly acclaimed artists. Participating brands in 2016 included Stubhub, PlayStation, Showtime, Hard Rock, Jansport, Tillys, Dickies, Virgin Mobile, Avocados from Mexico and The Guardian. </p>
          <p><a className="hover-grey" href="http://www.culturecollide.com/feed/detail/recap_collideonrainey_2016" target="_blank">See photos and highlights from 2016.</a></p>
          <h4>Under the Stars </h4>
          <p>Launched in 2015, Under the Stars is an invite-only creative gathering outside of major cities. Each camping event features a unique experience featuring live music, a curated culinary experience and a chance to meet new friends. Past cities have included Austin, Los Angeles, San Francisco, New York, and Boston. 2015 partners included Topo Chico, Deep Eddy, Pabst Blue Ribbon, Not Your Father’s Root Beer, The Guardian, Virgin Mobile and Burton. </p>
          <h4>Culture Collide Festival </h4>
          <p>Established in 2011, Culture Collide Festival, is a unique celebration of creative curiosity stretching across the renowned and intimate venues of Los Angeles, San Francisco, and New York City. The lineup includes artists from over 20 different countries from around the world. The festival has been featured in The Wall Street Journal, Huffington Post, and Time Out, among others. </p>
          <h3>About our founder </h3>
          <p>Alan Miller has over 20+ years experience in entertainment and cultural marketing.</p>
          <p>In that time he founded COLLiDE Agency, Culture Collide festival, Travel with Purpose media network, and co-founded the influential music and culture magazine FILTER. Points of passion include his love for unusual foods, minor league baseball, and far-away travel. </p>
          <h3>GET IN TOUCH:</h3>
          <p>
            <strong>Write for us:</strong> <a className="hover-grey" href="mailto:rachael.roth@wearecollide.com">rachael.roth@wearecollide.com</a><br/>
            <strong>Intern in LA, NY, or Chicago:</strong> <a className="hover-grey" href="mailto:wes.martinh@wearecollide.com">wes.martin@wearecollide.com</a><br/>
            <strong>Advertise with us:</strong><br/>
            West Coast: <a className="hover-grey" href="mailto:maria@wearecollide.com">maria@wearecollide.com</a><br/>
            East Coast: <a className="hover-grey" href="mailto:monique.gilbert@wearecollide.com">monique.gilbert@wearecollide.com</a><br/>
            <strong>Say hi to our founder:</strong> <a className="hover-grey" href="mailto:miller@wearecollide.com">miller@wearecollide.com</a><br/>
          </p>
        </div>
        <div className="clear"></div>
      </div>
    </div>
  </div>);
}

export const AboutComponent = () => (
  <div>{getAbout()}<TrendingContainer/></div>
)
