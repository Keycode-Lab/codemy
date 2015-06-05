Template.layout.events({
  'click #inner-wrapper': function (e) {
    if( $('#wrapper').hasClass('sidebar-right-notification') ) {
      $('#wrapper').removeClass('sidebar-right-notification');
    }
  },
  'click #signout': function () {
    var currentUser = Meteor.user().profile.username ||
                      Meteor.user().profile.name;
    Meteor.logout( function() {
      Router.go('/');
      setTimeout( function () {
        // sAlert.success('Good Bye ' + currentUser + '!');
      }, 100);
    });
    //var currentUser = Meteor.user().profile.username || Meteor.user().profile.name;
    //throwSuccess('Sign Out Successful', 'We will miss you ' + currentUser);
  }
});

Template.layout.onRendered( function () {
  if ($(window).width() <= 479) {
    Session.set('mobile', true);
  } else {
    Session.set('mobile', false);
  };

  $(".modal").draggable({
    handle: ".modal-header"
  });

  // Prevent Focus on Button & Textarea
  $('input, textarea, button, a').on('focus', function (event) {
    event.preventDefault();
  });

  $('input, textarea, button, a').on('blur', function (event) {
    event.preventDefault();
  });

  // $('input, textarea').ontouch = function (event) {
  //   event.preventDefault();
  // };

  /* Prevent Scrolling when focused/touched (Mobile)
  $(document).ready(function() {
    document.ontouchmove = function(e){
      e.preventDefault();
    }
  });
  */
});