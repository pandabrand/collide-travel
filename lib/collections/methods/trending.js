import { Meteor } from 'meteor/meteor';
import {TrendingCollections} from '../trending.js';
import moment from 'moment';
import { Session } from 'meteor/session';

let xml2json = '';
if(Meteor.isServer){
 xml2json = Meteor.npmRequire( 'xml2json' );
}

const CC_URL = 'http://www.culturecollide.com';

Meteor.methods({
  'get.feed': function() {
    if(Meteor.isServer) {
      var convertAsyncToSync = Meteor.wrapAsync(HTTP.get),
      resultofAsync = convertAsyncToSync("http://www.culturecollide.com/feed/trending_travel",
        {headers:{'Access-Control-Allow-Origin':'http://www.culturecollide.com'}},
      );
      const content = resultofAsync.content;
      const xmldoc = xml2json.toJson( content , { object: true } );
      const items = xmldoc.rss.channel.item;
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
      const xmldoc = xml2json.toJson( content , { object: true } );
      const items = xmldoc.rss.channel.item;
      return items;
      }
  }

});
