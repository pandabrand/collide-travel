import { Accounts } from 'meteor/accounts-base';

if(Meteor.isClient) {
  Accounts.config({passwordResetTokenExpirationInDays:5});
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });
  Accounts.onLogin(function() {
    redirect = Session.get('redirectAfterLogin');
    if(redirect && redirect !== '/login') {
      return FlowRouter.go(redirect);
    } else {
      FlowRouter.go('dashboard');
    }
  });
  AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: true,
    overrideLoginErrors: true,
  });
}
