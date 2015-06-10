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

    Meteor.call('commentInsert', object, function(error, commentId) {
        if (error){
          //throwError(error.reason);
        } else {
          template.$('.comment-submit').val('');
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

    Meteor.call('commentAnswerInsert', object, function(error, commentId) {
        if (error){
          //throwError(error.reason);
        } else {
          template.$('.comment-answer-submit').val('');
        }
    });
  }
});