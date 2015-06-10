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

    // write to database
    data._id = Answers.insert(data);

    return data._id;
  },

});