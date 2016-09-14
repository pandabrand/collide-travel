import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MagazinesCollection } from '../magazines.js';

Meteor.methods({
  'magazines.insert'(magazine) {
    MagazinesCollection.simpleSchema().clean(magazine,{
      extendAutoValueContext: {
        isInsert: true,
        isUpdate: false,
        isUpsert: false,
        isFromTrustedCode: false,
      }
    });

    check(magazine, {
      issue: String,
      guidePreview: String,
      printDownloadLink: Match.Maybe(String),
      showDownloadLink: Boolean,
      printPurchaseLink: Match.Maybe(String),
      showPurchaseLink: Boolean,
      showPrintGuide: Boolean,
    });

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
      MagazinesCollection.insert({
          issue: magazine.issue,
          guidePreview: magazine.guidePreview,
          printDownloadLink: magazine.printDownloadLink,
          showDownloadLink: magazine.showDownloadLink,
          printPurchaseLink: magazine.printPurchaseLink,
          showPurchaseLink: magazine.showPurchaseLink,
          showPrintGuide: magazine.showPrintGuide,
      });
    } else {
      throw new Meteor.Error('magazines.insert',
        'Must have the correct permissions for insertion');
    }
  },
  'magazines.remove'(magazineId) {
    check(magazineId, String);

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
      const magazine = MagazinesCollection.findOne(magazineId);

      MagazinesCollection.remove(magazine);
    } else {
      throw new Meteor.Error('magazines.remove',
        'Must have the correct permissions for removal');
    }
  },
  'magazines.update'(updatedMagazine, id) {
    MagazinesCollection.simpleSchema().clean(updatedMagazine,{
      extendAutoValueContext: {
        isInsert: false,
        isUpdate: true,
        isUpsert: false,
        isFromTrustedCode: false,
      }
    });

    check(id, String);
    check(updatedMagazine, Object);

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
      MagazinesCollection.update({_id: id}, updatedMagazine);
    } else {
      throw new Meteor.Error('magazines.update',
        'Must have the correct permissions for updating');
    }
  },
});
