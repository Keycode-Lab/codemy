Template.commentItem.events({
  'click .btn-comment-delete': function (event) {
    Meteor.call('commentRemove', this.postId, this._id, function (error, result) {
      if (error) {
        console.log(error);
        throwError(error.reason);
      } else {
        throwSuccess('댓글이 성공적으로 삭제됐습니다.')
      }
    } );

  }
});

Template.commentItem.helpers({
  // Needs more work
  // commentOp: function () {
  //   var post = Posts.findOne({_id: this._id});
  //   if (post && post.user && post.user._id) {
  //     var author          = Meteor.users.findOne({_id: post.user._id});
  //     var commentAuthorId = this.user._id;
  //     var commentAuthor   = Meteor.users.findOne({_id: commentAuthorId});

  //     if (author === commentAuthor) {
  //       return 'comment-op';
  //     }
  //   }
  // }
});