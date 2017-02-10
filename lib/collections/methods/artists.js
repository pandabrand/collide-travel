import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ArtistsCollection } from '../artists.js';
import { ArtistCommentsCollection } from '../artist-comments.js';

Meteor.methods({
  'artists.insert'(artist) {

    ArtistsCollection.simpleSchema().clean(artist,{
      extendAutoValueContext: {
        isInsert: true,
        isUpdate: false,
        isUpsert: false,
        isFromTrustedCode: false,
      }
    });

    check(artist, {
      artistName: String,
      artistSlug: String,
      cityId: String,
      cityName: String,
      image: String,
      photoCredit: Match.Maybe(String),
      locationIds: [String],
      soundcloud: Match.Maybe(String),
      description: String,
      color: String,
      isFeatured: Match.Maybe(Boolean),
    });

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor','artist-editor'],'default')) {
      artistInsert = ArtistsCollection.insert({
          artistName: artist.artistName,
          artistSlug: artist.artistSlug,
          cityId: artist.cityId,
          image: artist.image,
          photoCredit: artist.photoCredit,
          cityName: artist.cityName,
          locationIds: artist.locationIds,
          color: artist.color,
          description: artist.description,
          soundcloud: artist.soundcloud,
          isFeatured: artist.isFeatured,
      });

      for(var i = 0; i < artist.locationIds.length; i++) {
        ArtistCommentsCollection.insert({
          artistId: artistInsert,
          locationId: artist.locationIds[i],
        });
      }
    } else {
      throw new Meteor.Error('artists.insert',
        'Must have the correct permissions for insertion');
    }

  },
  'artists.remove'(artistId) {
    check(artistId, String);

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor','artist-editor'],'default')) {
      const artist = ArtistsCollection.findOne(artistId);
      ArtistCommentsCollection.remove({artistId:artistId});
      // for(var i = 0; i < artist.locationIds.length; i++) {
      //   ArtistCommentsCollection.remove({
      //     locationId: artist.locationIds[i],
      //     artistId: artistId,
      //   });
      // }
      ArtistsCollection.remove({_id:artist._id});
    } else {
      throw new Meteor.Error('artists.remove',
        'Must have the correct permissions for removal');
    }
  },
  'artists.update'(updatedArtist, id, locationIds) {
    ArtistsCollection.simpleSchema().clean(updatedArtist,{
      extendAutoValueContext: {
        isInsert: false,
        isUpdate: true,
        isUpsert: false,
        isFromTrustedCode: false,
      }
    });

    check(updatedArtist, Object);
    check(id, String);
    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin'])) {
      dbArtist = ArtistsCollection.findOne({_id:id},{locationIds:1});
      ArtistsCollection.update({_id: id}, updatedArtist);
      upArtist = ArtistsCollection.findOne({_id:id},{locationIds:1});
      var removeComments = _.difference(dbArtist.locationIds, upArtist.locationIds);
      var addComments = _.difference(upArtist.locationIds, dbArtist.locationIds);

      for(var i = 0; i < removeComments.length; i++) {
        ArtistCommentsCollection.remove({locationId: removeComments[i],artistId: id});
      }
      for(var i = 0; i < addComments.length; i++) {
        ArtistCommentsCollection.insert({
          artistId: id,
          locationId: addComments[i],
        });
      }
    } else {
      throw new Meteor.Error('artists.update',
        'Must have the correct permissions for updating');
    }
  },
  'artists.getCityId': function() {
    return ArtistsCollection.findOne().cityId;
  },
  'comments.update': function(updatedComment, id) {
    check(updatedComment, Object);
    check(id, String);

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor','artist-editor'],'default')) {
      ArtistCommentsCollection.update({_id: id}, updatedComment);
    } else {
      throw new Meteor.Error('artists.update',
        'Must have the correct permissions for updating');
    }
  },
  'correct.comments': function() {
    const artists = ArtistsCollection.find({},{_id:1, locationIds:1}).fetch();
    const artistComments = ArtistCommentsCollection.find({}).fetch();
    // const artistWithCommentsIds = _.pluck(artistComments, 'artistId');
    let artistsNoComments = [];
    _(artists).each((artist) => {
      _(artist.locationIds).each((locationId) => {
        console.log('artist:'+artist._id+' location:'+locationId);
        const filterd = _(artistComments).where({artistId:artist._id,locationId:locationId});
        console.dir(filterd);
        console.log(_.isEmpty(filterd));
        //add to no comments
        if(_.isEmpty(filterd)) {
          artistsNoComments.push(artist);
          ArtistCommentsCollection.insert({
            artistId: artist._id,
            locationId: locationId,
            comment: '',
          });
        }
      });
    });
  },
});
