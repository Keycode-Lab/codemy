Template.account.events({
  'click .profile-edit-username .btn-edit': function () {
    var usernameEdit = $('li.profile-edit-username');

    if (usernameEdit.hasClass('open')) {
      usernameEdit.removeClass('open');
    } else {
      usernameEdit.addClass('open');
    }
  },

  'click .profile-edit-email .btn-edit': function () {
    var emailEdit = $('li.profile-edit-email');

    if (emailEdit.hasClass('open')) {
      emailEdit.removeClass('open');
    } else {
      emailEdit.addClass('open');
    }
  }
});