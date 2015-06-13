Template.account.events({
  'click .profile-edit-username .btn-edit': function () {
    var usernameEdit = $('li.profile-edit-username');

    if (usernameEdit.hasClass('open')) {
      usernameEdit.removeClass('open');
    } else {
      usernameEdit.addClass('open');
    }

    $('li.profile-edit-username .inner').slideToggle(300);
  },

  'click .profile-edit-email .btn-edit': function () {
    var emailEdit = $('li.profile-edit-email');

    if (emailEdit.hasClass('open')) {
      emailEdit.removeClass('open');
    } else {
      emailEdit.addClass('open');
    }

    $('li.profile-edit-email .inner').slideToggle(300);
  },

  'click .profile-change-password .btn-edit': function () {
    var passwordChange = $('li.profile-change-password');

    if (passwordChange.hasClass('open')) {
      passwordChange.removeClass('open');
    } else {
      passwordChange.addClass('open');
    }

    $('li.profile-change-password .inner').slideToggle(300);
  },

  'click .profile-edit-item .btn-edit': function (event) {
    var item = $(event.target).closest('.profile-edit-item');
    if (item.hasClass('open')) {
      $(event.target).html('닫기');
    } else {
      $(event.target).html('수정');
    }
    $(event.target).blur();
  }
});