Meteor.methods({
  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var affectedUpvote = Posts.update({
      _id: postId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
  },

  unvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var post = Posts.findOne(postId);

    if(! post)
      throw new Meteor.Error('invalid', "게시물이 존재하지 않습니다!");

    if(_.include(post.upvoters, this.userId))
      Posts.update(post._id, {
        $pull: {upvoters: this.userId},
        $inc: {votes:-1}
      });
  },

  downvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var affectedDownvote = Posts.update({
      _id: postId,
      downvoters: {$ne: this.userId}
    }, {
      $addToSet: {downvoters: this.userId},
      $inc: {votes: -1}
    });
  },

  undownvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var post1 = Posts.findOne(postId);

    if(! post1)
      throw new Meteor.Error('invalid', "게시물이 존재하지 않습니다!");

    if(_.include(post1.downvoters, this.userId))
      Posts.update(post1._id, {
        $pull: {downvoters: this.userId},
        $inc: {votes:1}
      });
  }

}); //End Meteor methods