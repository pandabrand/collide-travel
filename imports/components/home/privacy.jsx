import React from 'react';
import { Session } from 'meteor/session';

import TrendingContainer from '/imports/containers/trending.jsx';

const getPrivacy = () => {
  return (<div className="container-fluid cc-container">
					<div className="row">
						<div className="col-md-12">
							<h1>Privacy Policy</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8 col-sm-12">
							<div className="aboutBody"><p>CULTURE COLLiDE respects the privacy concerns of users of this website. As a general rule, no personal information is automatically collected from users of wearecollide.com. Personally identifiable data about users of wearecollide.com are known to wearecollide.com only when voluntarily submitted by users of the site. However, certain non-personal information of users (for example, the type of browser being used, the operating system used by the user and the domain name of the user’s Internet service provider) is collected. This information is primarily used for internal purposes, but only in an aggregate form (individual users cannot be identified). Personally identifiable information may be collected from users of wearecollide.com when users voluntarily provide this information. All such personal information is retained by COLLiDE and is not sold or otherwise transferred by COLLiDE unless the express consent to do so has been obtained or if COLLiDE is required by law or by a court or governmental order to disclose such information in a particular circumstance. This information is used by COLLiDE to better understand usage patterns and to enhance user enjoyment of wearecollide.com. Aggregate information may be shared with advertisers; however, as is set forth more fully below, no data concerning users under the age of 13 is ever used. COLLiDE sometimes uses e-mail addresses and other personally identifiable information to contact users who provide their e-mail addresses for specific purposes. Each communication will contain instructions on how to discontinue receipt of such communications.</p><p>Children under the age of thirteen (13) should not provide any personally identifiable information on this site without the knowledge and permission of his or her parent or guardian. In the event that COLLiDE determines that a user of this site is under the age of 13, COLLiDE will not maintain or use any personally identifiable information about such user without the consent of his or her parent or guardian, except as allowed by law. The result of the foregoing is that children under the age of 13 will be unable to participate in some activities on the site without parental consent. COLLiDE may collect personally identifiable information directly from visitors on this site who may be under the age of 13. However, COLLiDE does not collect this information without the knowledge of the visitor.</p><p>All activities on this site are carried out in compliance with the Children’s Online Privacy Protection Act. Pursuant to the foregoing Act, COLLiDE does not ask a child web site visitor to provide more personal information than is reasonably necessary to allow the child visitor to participate in an activity on this site. To further comply with the Act, any personally identifiable information collected from such a visitor is used only for the purpose of enabling the visitor’s participation in activities on this site. If, for example, COLLiDE offers certain promotional items to users of the website, such as a promotional compact disc or t-shirt, COLLiDE requests that such interested party provide his or her name and mailing address in order to send the web site visitor the promotional item. The visitor’s email address is used only if we need to contact the visitor to verify name and mailing address. This information is not retained after the item has been delivered, and COLLiDE does not use it for any other purpose. In the event that COLLiDE conducts an Internet contest on this site, COLLiDE asks each contestant to provide date of birth, as well as his or her name, address, and e-mail address. Information submitted in order to participate in a contest is not used for any other purpose. In some circumstances, COLLiDE also asks child visitors to this site to provide COLLiDE with his or her parent’s or guardian’s contact information so that COLLiDE may contact the child visitor’s parent or guardian to notify them of COLLiDE’ information practices with respect to children, to notify that person of a child’s participation on this site, and/or to seek the consent of the parent or guardian to such participation. The parent or guardian of any person under the age of 13 whose personal information has been collected on this site may ask to review that personal information and may, if they so choose, request that such information be deleted, and that no additional information be gathered by COLLiDE. For more information on how to request review of personal information and/or to request that COLLiDE cease gathering such information, please contact the contact person listed below. Please note that no personal information collected on this site is shared with third parties other than a parent or guardian of a site visitor, except that information may be shared with those with whom COLLiDE contracts in order to carry out the internal operations of the site (for example, to send a visitor a promotional item that he or she may have requested on the site). In particular, COLLiDE does not rent or sell mailing lists of site visitors to any third party.</p><p>The method by which the foregoing information is gathered is known as “cookies.” COLLiDE uses “cookies,” which are pieces of information that are transferred to an individual user’s hard drive for record-keeping purposes. Cookies do not contain any personally identifying information. Cookies function by saving your passwords and site preferences. As a result, it is possible to speed up a visitor’s future activities on the website and allow COLLiDE to provide such visitor information specifically tailored to his or her interests. Such visitor may be able to set his or her browser to refuse cookies or to alert you when cookies are being sent. The COLLiDE’ site may contain links to Web sites other than the COLLiDE site. COLLiDE is only responsible for its own privacy practices and the content of its site. COLLiDE is not responsible for the privacy practices or the content of any other Web sites.</p><p>By using COLLiDE, you signify your consent to this Privacy Policy. If you do not agree to the terms of this policy, please do not use wearecollide.com. COLLiDE reserves the right, at their sole discretion, to change, modify, add or remove portions of this policy at any time. Please check this page periodically for changes. Your continued use of wearecollide.com following the posting of changes to these terms will mean that you accept those changes.</p><p>Individuals with questions about this policy, should please contact: <a href="mailto:info@wearecollide.com">info@wearecollide.com</a>.</p></div>
							<br/>
							<div className="clear"></div>
						</div>
					</div>
				</div>);
}

export const PrivacyComponent = () => (
  <div>{getPrivacy()}<TrendingContainer/></div>
)