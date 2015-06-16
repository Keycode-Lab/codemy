Posts = new Mongo.Collection('posts');

Meteor.methods({

  postSubmit: function (object) {
    check(this.userId, String);
    check(object, {
      title: String,
      content: String,
      tags: Array
    });

    // check permission
    if (! this.userId)
      throw new Meteor.Error(ERROR_CODE_SECURITY, "error_access_denied");

    // set input object
    var now = new Date();
    var user = Meteor.user();

    var data = {
      title: object.title,
      content: object.content,
      tags: object.tags,
      user: {
        _id: user._id,
        username: user.username,
        //name: user.name
      },
      createdAt: now,
      updatedAt: 0,
      votes : 0,
      views: 0,
      commentsCount: 0,
      answersCount: 0,
    };
    Meteor._sleepForMs(2000);
    // write to database
    data._id = Posts.insert(data);

    return data._id;
  },

  postEdit: function (postId ,object) {
    check(object, {
      title: String,
      content: String,
      tags: Array
    });

    // check permission
    if (! this.userId)
      throw new Meteor.Error(ERROR_CODE_SECURITY, "error_access_denied");

    // set input object
    var now = new Date();
    var user = Meteor.user();

    var data = {
      title: object.title,
      content: object.content,
      tags: object.tags,
      updatedAt: now,
    };
    Meteor._sleepForMs(2000);
    // write to database
    var updated = Posts.update({ _id: postId, 'user._id': this.userId }, { $set: data });

    return postId;
  },

  postRemove: function (authorId, postId) {

    // Check Permission
    if (! this.userId)
      throw new Meteor.Error(403, "error_access_denied");

    // Check If Owner
    if (this.userId !== authorId)
      return false;

    // Remove Comment
    var removedComments = Comments.remove({postId: postId});

    // Remove Answer Comment
    var answerId = Answers.find({postId: postId}).forEach( function (eachAnswer) {
      Comments.remove({answerId: eachAnswer._id});
    });

    // Remove Answers
    var removedAnswers = Answers.remove({postId: postId});

    // Remove Post
    var removed = Posts.remove({ _id: postId, 'user._id': this.userId });

    return removed;
  }

});