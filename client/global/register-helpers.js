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

Template.registerHelper('session', function (input) {
  return Session.get(input);
});