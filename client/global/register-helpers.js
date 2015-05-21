// Current user avatar Helper
Template.registerHelper('avatar', function () {
  var user = Meteor.user();
  if( user && user.profile ){
    //Show user profile
    return user.profile.avatar;
  } else {
    // If user doesn't exist
    // Show default avatar
    return '/img/avatar.png';
  }
});

// Session Input for Live Preview Helper
Template.registerHelper('session', function (input) {
  return Session.get(input);
});

Template.registerHelper('activeRoute', function (/* route names */) {
  var args = Array.prototype.slice.call(arguments, 0);
  args.pop();

  var active = _.any(args, function (name) {
    return Router.current() && Router.current().route.getName() === name
  });

  return active && 'active';
});

