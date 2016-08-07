import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'user.insert'(user) {
    console.log('user: ' + JSON.stringify(user));
    if(Roles.userIsInRole(Meteor.userId(), ['super-admin','admin'])) {
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

    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
      const user = Meteor.users.findOne(userId);

      Meteor.users.remove(user);

    } else {
      throw new Meteor.Error('pages.remove',
        'Must have the correct permissions for removal');
    }
  },
  'user.update'(updatedPage, id) {
    if(Roles.userIsInRole(this.userId, ['super-admin','admin'])) {
    } else {
      throw new Meteor.Error('Pages.update',
        'Must have the correct permissions for updating');
    }
  },
});
