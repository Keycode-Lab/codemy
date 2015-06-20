Template.commentSubmit.events({
  'click .btn-comment': function (event, template) {
    event.preventDefault();

    var object = {
      comment: template.$('.comment-submit').val(),
      postId: template.data._id,
    };

    var errors = {};

    // if (! comment.commentBody) {
    //   errors.body = "Please write some content";
    //   return Session.set('commentSubmitErrors', errors);
    // }

    template.$('.btn-comment').addClass('btn-loading')
                              .attr('disabled', true);

    Meteor.call('commentInsert', object, function(error, commentId) {
        if (error){
          console.log(error);
          throwError(error.reason);
        } else {
          $('.comment-submit').val('');
          template.$('.btn-comment').removeClass('btn-loading')
                                    .attr('disabled', false);
          throwSuccess('댓글이 성공적으로 등록됐습니다.')
        }
    });
  }
});

Template.commentAnswerSubmit.events({
  'click .btn-comment-answer': function (event, template) {
    event.preventDefault();
    console.log(template.data._id)
    var object = {
      comment: template.$('.comment-answer-submit').val(),
      answerId: template.data._id,
    };

    var errors = {};

    // if (! comment.commentBody) {
    //   errors.body = "Please write some content";
    //   return Session.set('commentSubmitErrors', errors);
    // }

    template.$('.btn-comment-answer').addClass('btn-loading')
                              .attr('disabled', true);


    Meteor.call('commentAnswerInsert', object, function(error, commentId) {
        if (error){
          throwError(error.reason);
          console.log(error);
        } else {
          template.$('.comment-answer-submit').val('');
          template.$('.btn-comment-answer').removeClass('btn-loading')
                                           .attr('disabled', false);
          throwSuccess('댓글이 성공적으로 등록됐습니다.')
        }
    });
  }
});