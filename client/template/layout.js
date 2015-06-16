Template.layout.events({
  'click #inner-body': function (e) {
    // Disabling Sidebar
    if( $('#wrapper').hasClass('sidebar-right-notification') ) {
      if (! $(event.target).is('.sidebar.right.notification, .sidebar.right.notification *')) {
        $('#wrapper').removeClass('sidebar-right-notification');
      }
    }
  },
  'click #signout': function () {
    Meteor.logout( function() {
      Router.go('/');
    });
    var currentUser = Meteor.user().profile.username ||
                      Meteor.user().profile.name;
    throwSuccess('다음에 또 오세요!');
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

  navScrol();
});