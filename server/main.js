
import { Meteor } from 'meteor/meteor';
import { CitiesCollection } from '../lib/collections/cities.js';
import { ArtistsCollection } from '../lib/collections/artists.js';
import { LocationsCollection } from '../lib/collections/locations.js';
import { TrendingCollection } from '../lib/collections/trending.js';
import { JsonRoutes } from 'meteor/simple:json-routes';


const MAP_KEY = Meteor.settings.public.GMAP_KEY;

Cloudinary.config ({
	cloud_name:Meteor.settings.public.CLOUDINARY_CLOUD_NAME,
  api_key:Meteor.settings.public.CLOUDINARY_API_KEY,
  api_secret:Meteor.settings.CLOUDINARY_API_SECRET,
});

Meteor.startup(() => {

	// Enable cross origin requests for all endpoints
	// "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
	JsonRoutes.setResponseHeaders({
	  "Cache-Control": "no-store",
	  "Pragma": "no-cache",
	  "Access-Control-Allow-Origin": "*",
	  "Access-Control-Allow-Methods": "GET, OPTIONS",
	  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
	});
	CitiesCollection._ensureIndex({displayName:"text",description:"text",isDefault:-1,isPromoted:-1,isFeatured:-1},{name:'cc_city_index'});
	ArtistsCollection._ensureIndex({artistName:"text",description:"text",cityName:"text",isFeatured:-1},{name:'cc_artist_index'});
	LocationsCollection._ensureIndex({name:"text",description:"text",address:"text"},{name:'cc_location_index'});
});

const trendingCron = new Cron(function() {
	Meteor.defer(function() {
		Meteor.call('get.feed.partial', (err, res) => {
			if(res && res.length > 0) {
				TrendingCollection.remove({});
				res.map((article, i) => {
					check(article,{
						title: String,
						secondaryTitle: String,
						description: String,
						secondaryDescription: Match.OneOf(String,Object),
						link: String,
						guid: String,
						'dc:image': String,
						'dc:subject': String,
						'dc:date': String
					});
					secondaryDesc = typeof article.secondaryDescription === 'string' ? article.secondaryDescription : ' ';
					TrendingCollection.insert({secondaryTitle:article.secondaryTitle, secondaryDescription: secondaryDesc, link:article.link, guid: article.guid, image: article['dc:image']});
				})
			}
		});
	});
}, {
    minute: 45,
		hour: 8
});
