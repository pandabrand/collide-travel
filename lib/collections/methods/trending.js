import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
// import { xml2json } from 'xml2json';
import convert from 'xml-js';

const CC_URL = 'http://www.culturecollide.com';

Meteor.methods({
  'get.feed.partial': function() {
    this.unblock();
    if(Meteor.isServer) {
      var convertAsyncToSync = Meteor.wrapAsync(HTTP.get),
      resultofAsync = convertAsyncToSync("http://www.culturecollide.com/feed/trending_travel",
        {headers:{'Access-Control-Allow-Origin':'http://www.culturecollide.com'}},
      );
      const content = resultofAsync.content;
      const xmldoc = JSON.parse(convert.xml2json( content , { compact: true, spaces: 4 } ));
      const items = Array.isArray(xmldoc.rss.channel.item) ? xmldoc.rss.channel.item : [xmldoc.rss.channel.item];
      return items;
      }
  },
  'get.feed.full': function() {
    if(Meteor.isServer) {
      var convertAsyncToSync = Meteor.wrapAsync(HTTP.get),
      resultofAsync = convertAsyncToSync("http://www.culturecollide.com/feed/full_trending_feed",
        {headers:{'Access-Control-Allow-Origin':'http://www.culturecollide.com'}},
      );
      const content = resultofAsync.content;
      const xmldoc = convert.xml2json( content , { compact: true, spaces: 4 } );
      const items = Array.isArray(xmldoc.rss.channel.item) ? xmldoc.rss.channel.item : [xmldoc.rss.channel.item];
      return items;
      }
  },
  'get.contest': function() {
    if(Meteor.isServer) {
      var convertAsyncToSync = Meteor.wrapAsync(HTTP.get),
      resultofAsync = convertAsyncToSync("http://www.culturecollide.com/contests/travel_contest",
        {headers:{'Access-Control-Allow-Origin':'http://www.culturecollide.com'}},
      );
      const content = resultofAsync.content;
      const xmldoc = convert.xml2json( content , { compact: true, spaces: 4 } );
      const items = Array.isArray(xmldoc.rss.channel.item) ? xmldoc.rss.channel.item : [xmldoc.rss.channel.item];
      return items;
      }
  },
  'add.subscriber': function(subscriber) {
    check(subscriber, {
      emailAddress: Match.Maybe(String),
      firstName: Match.Maybe(String),
      lastName: Match.Maybe(String),
      zipCode: Match.Maybe(String),
      city: Match.Maybe(String),
      emailError: Match.Maybe(String),
      successMessage: Match.Maybe(String),
      isOpen: Match.Maybe(Boolean),
    });
    const form_subscriber = {
      "email": subscriber.emailAddress,
      "fields": {
        "Name":subscriber.firstName ? subscriber.firstName : undefined,
        "last_name":subscriber.lastName ? subscriber.lastName : undefined,
        "zip":subscriber.zipCode ? subscriber.zipCode : undefined,
        "city": subscriber.city ? subscriber.city : undefined
      }
    };
    if(Meteor.isServer) {
      const POSTUrl = "http://api.mailerlite.com/api/v2/groups/"+Meteor.settings.public.MAILER_LITE_GROUP_ID+"/subscribers";
      var convertAsyncToSync = Meteor.wrapAsync(HTTP.post),
      resultofAsync = convertAsyncToSync(POSTUrl,
        {
          data:form_subscriber,
          headers:{'Content-Type':'application/json','X-MailerLite-ApiKey':Meteor.settings.private.MAILER_LITE_API_KEY},
        });
      const content = resultofAsync;
      return content;
    }
  }

});
