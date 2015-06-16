Answers = new Mongo.Collection('answers');

Meteor.methods({

  answerSubmit: function (object) {
    check(this.userId, String);
    check(object, {
      postId: String,
      content: String,
//      tags: Array
    });

    // check permission
    if (! this.userId)
      throw new Meteor.Error(ERROR_CODE_SECURITY, "error_access_denied");

    // set input object
    var now = new Date();
    var user = Meteor.user();

    var data = {
      content: object.content,
      postId: object.postId,
      user: {
        _id: user._id,
        username: user.username,
        //name: user.name
      },
      createdAt: now,
      updatedAt: now,
      votes : 0,
      views: 0,
      commentsCount: 0,
      answersCount: 0,
    };
    Meteor._sleepForMs(2000);

    Posts.update(data.postId, {$inc: {answersCount: 1}});

    // write to database
    data._id = Answers.insert(data);

    return data._id;
  },

  answerEdit: function (answerId ,object) {
    check(object, {
      content: String,
    });

    // check permission
    if (! this.userId)
      throw new Meteor.Error(ERROR_CODE_SECURITY, "error_access_denied");

    // set input object
    var now = new Date();
    var user = Meteor.user();

    var data = {
      content: object.content,
      updatedAt: now,
    };
    Meteor._sleepForMs(2000);
    // write to database
    var updated = Answers.update({ _id: answerId, 'user._id': this.userId }, { $set: data });

    return updated;
  },


  answerRemove: function (authorId, postId, answerId) {

    // Check Permission
    if (! this.userId)
      throw new Meteor.Error(403, "error_access_denied");

    // Check If Owner
    if (this.userId !== authorId)
      return false;

    Posts.update(postId, {$inc: {answersCount: -1}});

    // Remove Answer Comment
    var removedComments = Comments.remove({answerId: answerId});

    // Remove Answers
    var removedAnswers = Answers.remove({_id: answerId});

    return removedAnswers;
  }

});