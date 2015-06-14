Template.dropdownPostPage.helpers({
  ownPost: function () {
    var post = Posts.findOne({_id: this._id});

    if (post && post.user && post.user._id) {
      return Meteor.userId() === post.user._id;
    }
  }
});

Template.dropdownPostPage.events({
  'click .post-delete': function (event, template) {
    var id = '#post-'+this._id;

    if ($('.delete-confirm').is(id)) {
      $('.delete-confirm').slideToggle(300);
    }
  }
});