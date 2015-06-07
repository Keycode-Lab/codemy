Comments = new Mongo.Collection('comments');

// Comments.allow({
//   update: function(userId, post) { return ownsDocument(userId, post); },
//   remove: function(userId, post) { return ownsDocument(userId, post) || Meteor.users.findOne({'profile.role': 'admin'}); },
// });

Meteor.methods({
  commentInsert: function(object) {
    check(this.userId, String);
    check(object, {
      postId: String,
      comment: String
    });



    var user = Meteor.user();
    var post = Posts.findOne(object.postId);
    var now = new Date();

    if (!post)
      throw new Meteor.Error('invalid-comment', 'You must comment on a post');

    // set input object
    var data = {
      comment: object.comment,
      postId: object.postId,
      user: {
        _id: user._id,
        username: user.username,
        //name: user.name
      },
      createdAt: now,
      updatedAt: now,
      votes : 0,
      flags : 0
    };

    // update the post with the number of comments
      //Posts.update(comment.postId, {$inc: {commentsCount: 1}});

    // create the comment, save the id
      data._id = Comments.insert(data);

    // now create a notification, informing the user that there's been a comment
      //createCommentNotification(comment);
      return data._id;
  },

  // commentAnswerInsert: function(commentAttributes) {
  //   check(this.userId, String);
  //   check(commentAttributes, {
  //     answerId: String,
  //     commentBody: String
  //   });

  //   var user = Meteor.user();
  //   var answer = Answers.findOne(commentAttributes.answerId);

  //   if (!answer)
  //     throw new Meteor.Error('invalid-comment', 'You must comment on a post');
  //   comment = _.extend(commentAttributes, {
  //     userId: user._id,
  //     author: user.username ||  user.profile.name,
  //     submitted: new Date()
  //   });
  //   // update the post with the number of comments
  //   //Answers.update(comment.answerId, {$inc: {commentsCount: 1}});

  //   // create the comment, save the id
  //   comment._id = Comments.insert(comment);
  //   // now create a notification, informing the user that there's been a comment
  //   //createAnswerCommentNotification(comment);
  //   return comment._id;
  // }
});