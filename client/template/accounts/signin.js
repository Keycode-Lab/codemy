Template.signin.events({
  'submit #signinForm': function(e, t){
    var username = t.find('#signin-user').value.toLowerCase(),
    password = t.find('#signin-password').value;

    Meteor.loginWithPassword(username, password, function(error){
      if (Meteor.user()){
        Router.go('/');

        var currentUser = Meteor.user().profile.username ||
                          Meteor.user().profile.name;

        setTimeout( function () {
          // sAlert.success('Welcome ' + currentUser + '!');
        }, 100);
      } else {
        // sAlert.error(error.reason);
        // throwError('Invalid Login', error.reason);
      }
      return;
    })
    return false;
  },
});