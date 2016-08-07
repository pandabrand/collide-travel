UserProfile = new SimpleSchema({
	firstName: {
		type: String,
		regEx: /^[a-zA-Z-]{2,25}$/,
		optional: true
	},
	lastName: {
		type: String,
		regEx: /^[a-zA-Z]{2,25}$/,
		optional: true
	},
});

User = new SimpleSchema({
	username: {
		type: String,
		regEx: /^[a-z0-9A-Z_]{3,15}$/
	},
	emails: {
		type: [Object],
		optional: true
	},
	"emails.$.address": {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
		type: Boolean
	},
	createdAt: {
		type: Date,
    autoform: {
      type: 'hidden'
    },
    autoValue: function() {
      if(this.isInsert) {
        return new Date()
      } else {
        this.unset();
      }
    },
	},
	profile: {
		type: UserProfile,
		optional: true
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true,
	},
  'services.password': {
    type: String,
    min: 8,
    max: 25,
    autoform: {
      label: 'Password 8-25 chars',
      type: 'password',
    },
  },
  roles: {
    type: String,
    optional: true,
    blackbox: true,
    allowedValues: ['admin', 'editor', 'artist-editor'],
  },
});
Meteor.users.attachSchema(User);


Meteor.users.allow({
	  insert: function () { return true; },
	  update: function () { return true; },
	  remove: function () { return true; }
});
