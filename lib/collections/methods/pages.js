import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { PagesCollection } from '../pages.js';

Meteor.methods({
  'pages.insert'(page) {

    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      PagesCollection.insert({
          title: page.title,
          subheader: page.subheader,
          copy: page.copy,
          image: page.image,
          isHome: page.isHome,
      });
    } else {
      throw new Meteor.Error('pages.insert',
        'Must have the correct permissions for insertion');
    }

  },
  'pages.remove'(pageId) {
    check(pageId, String);

    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      const page = PagesCollection.findOne(pageId);

      PagesCollection.remove(page);
    } else {
      throw new Meteor.Error('pages.remove',
        'Must have the correct permissions for removal');
    }
  },
  'pages.update'(updatedPage, id) {
    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      PagesCollection.update({_id: id}, updatedPage);
    } else {
      throw new Meteor.Error('Pages.update',
        'Must have the correct permissions for updating');
    }
  },
});
