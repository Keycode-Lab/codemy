Template.signin.events({
  'submit #signinForm': function(e, t){
    var username = t.find('#signin-user').value.toLowerCase(),
    password = t.find('#signin-password').value;

    Meteor.loginWithPassword(username, password, function(error){
      if (error) {
        console.log(error.reason)
        throwError(error.reason);
      } else {
        if (Router.current() && Router.current().route.getName() === 'signin') {
          // if we are on the login route, we want to redirect the user
          Router.go('/');
        }
        var currentUser = Meteor.user().profile.username || Meteor.user().profile.name ;
        throwSuccess('어서오세요 ' + currentUser + '님');
      }

    });
    return false;
  },
});