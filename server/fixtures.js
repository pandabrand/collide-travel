// Fixture data
import { CitiesCollection } from '../lib/collections/cities.js';
import { MagazinesCollection } from '../lib/collections/magazines.js';
import { EventsCollection } from '../lib/collections/events.js';
import { LocationsCollection } from '../lib/collections/locations.js';
import { ArtistsCollection } from '../lib/collections/artists.js';
import { ArtistCommentsCollection } from '../lib/collections/artist-comments.js';
import { AdZoneCollection } from '../lib/collections/ad-zone.js';

// if(AdZoneCollection.find().count() === 0) {
//   AdZoneCollection.insert({
//     topAd: '', cityGuideAd: '', takeoverAd: '', showAdTakeover: false,
//   });
// }
// if(MagazinesCollection.find().count() === 0) {
//   for(var i = 0; i < 5; i++) {
//     MagazinesCollection.insert(
//     { _id: i.toString(), issue: i.toString(), featured: 'Animal Collective (Lisbon/LA/D.C.), YACHT (Los Angeles), HINDS (Madrid), Andrew W.K. & Lil BUB (The Universe), Poliça (Minneapolis), Santigold (LA/NYC/Jamaica/Tanzania), Miike Snow (Stockholm), Eleanor Friedberger (New York), SWIMM, Dan Deacon (Baltimore), Belle & Sebastian and Franz Ferdinand (Glasgow), MØ (Copenhagen), Nova Heart (Beijing), and so many more.',
//       download: true, purchase: 0 !== i%3, preview: 'http://lorempixel.com/300/357/transport/',
//     });
//
//   }
// }
//
// if(EventsCollection.find().count() === 0) {
//   for(var x = 0; x < 5; x++) {
//     EventsCollection.insert(
//       {
//         _id: x.toString(), title: 'This is an awesome event.', description: '<p>Lorem ipsum dolor sit amet, legendos quaestio efficiendi id nec, vim elitr omittam consetetur ex, ad periculis splendide reprehendunt quo. Et brute persequeris sit, persius habemus percipitur pro no, partem nullam vel et. Noster assentior eu mei. Eu veri quodsi quo, cu legendos iudicabit persecuti his, in mel mutat velit menandri. Eu vix tamquam voluptua luptatum, an vel illud inani.</p><p>Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.</p>',
//         image: 'http://lorempixel.com/640/480/food/'+x.toString(), eventDate: new Date('2019-12-13T20:00:00Z'), location: 'Chicago, IL'
//       }
//     );
//   }
// }
//
// if(CitiesCollection.find().count() === 0) {
//   CitiesCollection.insert({_id: '1', cityName: 'new-york', displayName: 'New York', state: 'NY', location: {lat:40.712784,lng:-74.005941}, lat:  40.712784, lng: -74.005941, guidePreview: 'http://lorempixel.com/300/410/city/1', isDefault: true, isPromoted: false});
//   CitiesCollection.insert({_id: '2', cityName: 'chicago', displayName: 'Chicago', state: 'IL', location: {lat:41.878114,lng:-87.629798}, lat: 41.878114, lng: -87.629798, guidePreview: 'http://lorempixel.com/300/410/city/2', isDefault: false, isPromoted: false});
//   CitiesCollection.insert({_id: '3', cityName: 'los-angeles', displayName: 'Los Angeles', state: 'CA', location: {lat:34.052234,lng:-118.243685}, lat: 34.052234, lng: -118.243685, guidePreview: 'http://lorempixel.com/300/410/city/3', isDefault: false, isPromoted: false});
// }
//
// if(LocationsCollection.find().count() === 0) {
//   LocationsCollection.insert({_id: '1', cityId: '1', location: {lat:40.7143818,lng:-73.9981829}, lat: 40.7143818, lng: -73.9981829, type:'bar', name:'Apotheke the bar', address:'9 Doyers St #1', photo:'http://lorempixel.com/100/100/fashion/1', description:'Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.', website:'http://www.apothekenyc.com/'});
//   LocationsCollection.insert({_id: '2', cityId: '1', location: {lat:40.713683,lng:-73.997181}, lat: 40.713683, lng: -73.997181, type:'restaurant', name:'Golden Unicorn Restaurant', address:'18 E Broadway', photo:'http://lorempixel.com/100/100/fashion/2', description:'Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.', website:'http://www.goldenunicornrestaurant.com/'});
//   LocationsCollection.insert({_id: '3', cityId: '1', location: {lat:40.743193,lng:-73.977578}, lat: 40.743193, lng: -73.977578, type:'restaurant', name:'Marchi\'s', address:'251 E 31st St', photo:'http://lorempixel.com/100/100/fashion/3', description:'Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.', website:'http://www.marchirestaurant.com/'});
//   LocationsCollection.insert({_id: '4', cityId: '1', location: {lat:40.680226,lng:-73.860875}, lat: 40.680226, lng: -73.860875, type:'nightclub', name:'Medina Hall', address:'76-15 101 Ave', photo:'http://lorempixel.com/100/100/fashion/4', description:'Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.', website:'http://medinahall.com/'});
//   LocationsCollection.insert({_id: '5', cityId: '1', location: {lat:40.685038,lng:-73.991847}, lat: 40.685038, lng: -73.991847, type:'boutique', name:'Article&', address:'198 Smith St', photo:'http://lorempixel.com/100/100/fashion/5', description:'Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.', website:'https://www.articleand.com/'});
//   LocationsCollection.insert({_id: '6', cityId: '2', location: {lat:41.913881,lng:-87.662596}, lat: 41.913881, lng: -87.662596, type:'music', name:'The Hideout', address:'1354 W Wabansia Ave', photo:'http://lorempixel.com/100/100/fashion/1', description:'Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.', website:'http://www.hideoutchicago.com/'});
//   LocationsCollection.insert({_id: '7', cityId: '2', location: {lat:41.881662,lng:-87.624969}, lat: 41.881662, lng: -87.624969, type:'bar', name:'Cindy\'s Rooftop', address:'12 S Michigan Ave', photo:'http://lorempixel.com/100/100/fashion/1', description:'Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.', website:'http://www.cindysrooftop.com/'});
// }
//
// if(ArtistsCollection.find().count() === 0) {
//   ArtistsCollection.insert({_id: '1', artistName: 'Le1f', artistSlug: 'le1f', cityId: '1', cityName: 'new-york', locationIds: ['1','3','5']});
//   ArtistsCollection.insert({_id: '2', artistName: 'St. Vincent', artistSlug: 'st-vincent', cityId: '1', cityName: 'new-york', locationIds: ['2','3','4']});
//   ArtistsCollection.insert({_id: '3', artistName: 'Rise Against', artistSlug: 'rise-against', cityId: '2', cityName: 'chicago', locationIds: ['6','7']});
// }
//
// if(ArtistCommentsCollection.find().count() === 0) {
//   ArtistCommentsCollection.insert({_id: '1', artistId: '1', locationId: '1', comment: 'Ludus assueverit ut his, eos ad duis decore hendrerit. In mea cotidieque deterruisset, usu unum meis assentior ex. An mandamus percipitur vix, an mei voluptua constituto reprehendunt. Ei alia iriure nominavi usu, graeci perfecto volutpat no ius. Quo oblique definitiones ne, dicam laoreet sea id.'});
//   ArtistCommentsCollection.insert({_id: '2', artistId: '1', locationId: '3', comment: 'Cu quas evertitur per. Nec reprimique eloquentiam ne, qui prompta mediocritatem ad. Pri percipitur deterruisset ad, pro in rebum errem voluptatum. Nam dolor nusquam iudicabit at, hinc nullam dolorum an cum.'});
//   ArtistCommentsCollection.insert({_id: '3', artistId: '1', locationId: '5', comment: 'Pri agam aeque at, minimum delectus nec an, vis ut pericula molestiae temporibus. Graece constituto ex vim, quem nominati consequat sed ne, ne sit verear antiopam.'});
//   ArtistCommentsCollection.insert({_id: '4', artistId: '2', locationId: '3', comment: 'Cu quas evertitur per. Nec reprimique eloquentiam ne, qui prompta mediocritatem ad. Pri percipitur deterruisset ad, pro in rebum errem voluptatum. Nam dolor nusquam iudicabit at, hinc nullam dolorum an cum.'});
//   ArtistCommentsCollection.insert({_id: '5', artistId: '2', locationId: '4', comment: 'Pri agam aeque at, minimum delectus nec an, vis ut pericula molestiae temporibus. Graece constituto ex vim, quem nominati consequat sed ne, ne sit verear antiopam.'});
//   ArtistCommentsCollection.insert({_id: '6', artistId: '3', locationId: '6', comment: 'Cu quas evertitur per. Nec reprimique eloquentiam ne, qui prompta mediocritatem ad. Pri percipitur deterruisset ad, pro in rebum errem voluptatum. Nam dolor nusquam iudicabit at, hinc nullam dolorum an cum.'});
//   ArtistCommentsCollection.insert({_id: '7', artistId: '3', locationId: '7', comment: 'Pri agam aeque at, minimum delectus nec an, vis ut pericula molestiae temporibus. Graece constituto ex vim, quem nominati consequat sed ne, ne sit verear antiopam.'});
// }
//
// if(Meteor.users.find().count() === 0) {
//   Accounts.createUser({
//     username: Meteor.settings.private.ADMIN_USERNAME,
//     email: Meteor.settings.private.ADMIN_EMAIL,
//     password: Meteor.settings.private.ADMIN_PASS
//   });
//   var first_user = Accounts.findUserByUsername(Meteor.settings.private.ADMIN_USERNAME);
//   Roles.addUsersToRoles(first_user._id, 'super-admin', Roles.GLOBAL_GROUP);
//   Roles.addUsersToRoles(first_user._id, 'admin', 'default');
// }
