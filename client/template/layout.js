Template.layout.events({
  'click #inner-wrapper': function (e) {
    if( $('#wrapper').hasClass('sidebar-right-set') ) {
      $('#wrapper').removeClass('sidebar-right-set');
    }
  },
  'click #signout': function(){
    Meteor.logout(function() {
      Router.go('/');
    });
    //var currentUser = Meteor.user().profile.username || Meteor.user().profile.name;
    //throwSuccess('Sign Out Successful', 'We will miss you ' + currentUser);
  }
});