Template.signin.events({
  'submit #signinForm': function(e, t){
    var username = t.find('#signin-user').value.toLowerCase(),
    password = t.find('#signin-password').value;

    Meteor.loginWithPassword(username, password, function(error){
      if (Meteor.user()){
        Router.go('/');
      } else {
        //throwError('Invalid Login', error.reason);
      }
      return;
    })
    return false;
  },
});