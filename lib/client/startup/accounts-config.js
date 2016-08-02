import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Accounts.onLogin(function() {
  let redirect = Session.get('redirectAfterLogin');
  if (typeof redirect !== 'undefined' && redirect !== null) {
    if (redirect !== '/login') {
      FlowRouter.go(redirect);
    }
  }
});
