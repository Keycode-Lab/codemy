Template.signin.events({
  'submit #signinForm': function(e, t){
    var username = t.find('#signin-user').value.toLowerCase(),
    password = t.find('#signin-password').value;

    Meteor.loginWithPassword(username, password, function(error){
      if (error) {
        console.log(error.reason)
      } else {
        if (Router.current() && Router.current().route.getName() === 'signin') {
          // if we are on the login route, we want to redirect the user
          Router.go('/');
        }
      }

    });
    return false;
  },
});