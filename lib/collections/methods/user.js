import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'user.insert'(user) {
    check(user, {
      username: String,
      emails: Match.optional(Array),
      firstName: String,
      lastName: String,
    });

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin'],'default')) {
      userId = Accounts.createUser({
          username: user.username,
          email: user.emails[0].address,
          password: user.services.password,
          profile: {
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
          },
      });
      console.log('is? ' + JSON.stringify(userId));
      if(Meteor.isServer){
        Roles.addUsersToRoles(userId, [user.roles], 'default');
      }
    } else {
      throw new Meteor.Error('pages.insert',
        'Must have the correct permissions for insertion');
    }

  },
  'user.remove'(userId) {
    check(userId, String);

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin'],'default')) {
      const user = Meteor.users.findOne(userId);

      Meteor.users.remove(user);

    } else {
      throw new Meteor.Error('pages.remove',
        'Must have the correct permissions for removal');
    }
  },
  'user.update'(updatedUser, id) {
    check(updatedUser, Object);
    check(id, String);

    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin'],'default')) {
    } else {
      throw new Meteor.Error('Pages.update',
        'Must have the correct permissions for updating');
    }
  },
});
