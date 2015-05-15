Template.layout.events({
  'click #inner-wrapper': function (e) {
    if( $('#wrapper').hasClass('sidebar-right-set') ) {
      $('#wrapper').removeClass('sidebar-right-set');
    }
  },
  'click #signout': function () {
    var currentUser = Meteor.user().profile.username ||
                      Meteor.user().profile.name;
    Meteor.logout( function() {
      Router.go('/');
      setTimeout( function () {
        sAlert.success('Good Bye ' + currentUser + '!');
      }, 100);
    });
    //var currentUser = Meteor.user().profile.username || Meteor.user().profile.name;
    //throwSuccess('Sign Out Successful', 'We will miss you ' + currentUser);
  }
});