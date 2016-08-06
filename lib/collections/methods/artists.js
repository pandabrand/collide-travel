import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ArtistsCollection } from '../artists.js';
import { ArtistCommentsCollection } from '../artist-comments.js';

Meteor.methods({
  'artists.insert'(artist) {

    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      ArtistsCollection.insert({
          artistName: artist.artistName,
          artistSlug: artist.artistSlug,
          cityId: artist.cityId,
          cityName: artist.cityName,
          locationIds: artist.locationIds,
      });
    } else {
      throw new Meteor.Error('artists.insert',
        'Must have the correct permissions for insertion');
    }

  },
  'artists.remove'(artistId) {
    check(artistId, String);

    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      const artist = ArtistsCollection.findOne(artistId);

      ArtistsCollection.remove(artist);
    } else {
      throw new Meteor.Error('artists.remove',
        'Must have the correct permissions for removal');
    }
  },
  'artists.update'(updatedArtist, id) {
    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      ArtistsCollection.update({_id: id}, updatedArtist);
    } else {
      throw new Meteor.Error('artists.update',
        'Must have the correct permissions for updating');
    }
  },
  'artists.getCityId': function() {
    return ArtistsCollection.findOne().cityId;
  },
  'comments.update': function(updatedComment, id) {
    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      ArtistCommentsCollection.update({_id: id}, updatedComment);
    } else {
      throw new Meteor.Error('artists.update',
        'Must have the correct permissions for updating');
    }
  },
});
