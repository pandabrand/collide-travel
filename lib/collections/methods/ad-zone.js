import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { AdZoneCollection } from '../ad-zone.js';

Meteor.methods({
  'ad.update'(updatedAd, id) {
    check(id, String);
    check(updatedAd, Object);

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
      AdZoneCollection.update({_id: id}, updatedAd);
    } else {
      throw new Meteor.Error('Ads.update',
        'Must have the correct permissions for updating');
    }
  },
});
