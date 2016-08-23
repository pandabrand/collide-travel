import React from 'react';
import { Session } from 'meteor/session';

import TrendingContainer from '../../containers/trending.jsx';

const getAbout = () => {
  return (<div className="container">
    <div className="row">
      <div className="col-md-12">
        <h1>About Us</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-md-8 col-sm-12">
        <div className="aboutBody">
          <p>Established in 2014, COLLiDE is an editorial platform, <a href="http://culturecollide.com/travelwithpurpose" target="_blank">travel magazine</a>, <a href="http://www.culturecollide.com/festivals/"  target="_blank">international festival</a>, event production company and <a href="http://www.wearecollide.com/" target="_blank">creative agency</a> founded by <a href="http://www.linkedin.com/in/filtermiller/" target="_blank">Alan Miller</a>, the co-founder of FILTER magazine.</p>
          <p>Through our biannual publication, Travel with Purpose (launched in 2015), and on the web, we deliver creative inspiration daily by bringing you the best music from around the world, exclusive interviews, dining recommendations, travel tips, and more.</p>
          <p><strong>About COLLiDE Agency:<br/></strong>COLLiDE is a boutique culture agency which has created a dynamic, forward-thinking model of business. Building on their decade-plus foundation of cross-cultural marketing experience, the COLLiDE agency sets a new charter for brands to explore. COLLiDE specializes in full brand integration. Current COLLiDE agency clients include Macy's, American Rag, Dr Martens, E&J Brandy, Shellback Rum, Landmark Theatres, Converse and many others. For more information on integrated brand campaigns visit our agency site:  <a href="http://www.wearecollide.com/"  target="_blank">weareCOLLiDE.com</a></p>
          <p><strong>ABOUT OUR EVENTS<br/></strong>Culture Collide<br/>For six years we produced the Culture Collide Festival, a unique celebration of creative curiosity stretching across the renowned and intimate venues of Los Angeles, San Francisco, and New York City. The lineup includes artists from over 20 different countries around the world, and attendees are bound to discover their new favorite band.</p>
          <p>COLLiDE On Rainey<br/>A main attraction at Austin’s SXSW festival, each year COLLiDE takes over Rainey Street for three days of nonstop music from today’s most highly acclaimed artists. <a href="http://www.culturecollide.com/feed/detail/recap_collideonrainey_2016#.V3Qr95MrJ-U" target="_blank">See photos and highlights from 2016</a>.</p>
          <p><strong>Check out our <a href="http://www.culturecollide.com/festivals/" target="_blank">events page</a> for more upcoming events near you.</strong> </p>
          <p><strong>GET IN TOUCH:<br/></strong><b>Write for us: </b> rachael.roth@wearecollide.com<br/><strong>Intern in LA, NY, or Chicago:</strong> wes.martin@wearecollide.com<br/><strong>Advertise with us:</strong><br/>West Coast: maria@wearecollide.com<br/>East Coast: monique.gilbert@wearecollide.com<br/><strong>Say hi to our founder:</strong> <a href="mailto:miller@wearecollide.com" target="_blank">miller@wearecollide.com</a></p>
        </div>
        <div className="clear"></div>
      </div>
    </div>
  </div>);
}

export const AboutComponent = () => (
  <div>{getAbout()}<TrendingContainer/></div>
)
