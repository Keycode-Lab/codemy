Template.commentItem.events({
  'click .btn-comment-delete': function (event, template) {
    template.$('a.btn-comment-delete').hide();
    template.$('span.comment-delete-confirm').show();
  },
  'click .btn-comment-delete-confirm': function (event, template) {
    Meteor.call('commentRemove', this.postId, this._id, function (error, result) {
      if (error) {
         console.log(error);
         throwError(error.reason);
      } else {
        throwSuccess('댓글이 성공적으로 삭제됐습니다.')
      }
    });
  },
  'click .btn-comment-delete-cancel': function (event, template) {
    template.$('span.comment-delete-confirm').hide();
    template.$('a.btn-comment-delete').show();
  },
  'click .btn-comment-edit': function (event, template) {
    $('.comment-item-inner').slideDown(300);
    $('.comment-edit').slideUp(300);
    template.$('.comment-item-inner').slideToggle(200);
    template.$('.comment-edit').slideToggle(200);
  },
  'click .btn-comment-edit-cancel': function (event, template) {
    template.$('.comment-item-inner').slideToggle(200);
    template.$('.comment-edit').slideToggle(200);
  },
  'click .btn-comment-save': function (event, template) {
      var comment = {
        comment:  template.find('.comment-submit').value
      }

      template.$('.btn-comment-save').addClass('btn-loading')
                                     .attr('disabled', true);

      Meteor.call('commentEdit', this._id, comment,  function (error, result) {
        if (error) {
          console.log(error);
          throwError(error.reason);
        } else {
          template.$('.comment-item-inner').slideToggle(200);
          template.$('.comment-edit').slideToggle(200);
          template.$('.btn-comment-save').removeClass('btn-loading')
                                         .attr('disabled', false);
          throwSuccess('댓글이 성공적으로 저장됐습니다.')
        }
      });
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