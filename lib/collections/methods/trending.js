import { Meteor } from 'meteor/meteor';
import {TrendingCollections} from '../trending.js';

let xml2json = '';
if(Meteor.isServer){
 xml2json = Meteor.npmRequire( 'xml2json' );
}

const CC_URL = 'http://www.culturecollide.com';

Meteor.methods({
  'get.feed'() {
    let isComplete = false;
    if(Meteor.isServer) {
      HTTP.call("POST", "http://www.culturecollide.com/feed/trending_travel",
        {headers:{'Access-Control-Allow-Origin':'http://www.culturecollide.com'}},
        function (error, result) {
          if (!error) {
            const content = result.content;
            const xmldoc = xml2json.toJson( content , { object: true } );
            const items = xmldoc.rss.channel.item;

            for(let i = 0; i < items.length; i++){
              const item = items[i];
              console.dir(item);
              dbItem = TrendingCollections.findOne({link:item.link});
              console.dir(dbItem);
              //make sure we are not inserting the same items in
              if(!dbItem) {
                console.log('check');
                  check(item, {
                  title: String,
                  link: String,
                  guid: String,
                  description: String,
                  'dc:subject': String,
                  'dc:date': String,
                  'dc:image': String,
                });

                console.log('insert');
                TrendingCollections.insert({
                  title: item.title,
                  link: item.link,
                  guid: item.guid,
                  description: item.description,
                  subject: item['dc:subject'],
                  date: item['dc:date'],
                  image: CC_URL + item['dc:image'],
                });
              }
            }
          } else {
            throw new Meteor.Error('get.feed',
              'There was a problem getting the news feed');
          }
          isComplete = true;
          return isComplete;
        });
      }
  }
});