Meteor.methods({
  upvoteAnswer: function(answerId) {
    check(this.userId, String);
    check(answerId, String);
    var op = Answers.findOne(answerId).user._id;
    if (this.userId !== op) {
      var affectedUpvote = Answers.update({
        _id: answerId,
        upvoters: {$ne: this.userId}
      }, {
        $addToSet: {upvoters: this.userId},
        $inc: {votes: 1}
      });
    }
  },

  unvoteAnswer: function(answerId) {
    check(this.userId, String);
    check(answerId, String);

    var answers = Answers.findOne(answerId);

    if(! answers)
      throw new Meteor.Error('invalid', "게시물이 존재하지 않습니다!");

    if(_.include(answers.upvoters, this.userId))
      Answers.update(answers._id, {
        $pull: {upvoters: this.userId},
        $inc: {votes:-1}
      });
  },

  downvoteAnswer: function(answerId) {
    check(this.userId, String);
    check(answerId, String);

    var op = Answers.findOne(answerId).user._id;
    if (this.userId !== op) {
      var affectedDownvote = Answers.update({
        _id: answerId,
        downvoters: {$ne: this.userId}
      }, {
        $addToSet: {downvoters: this.userId},
        $inc: {votes: -1}
      });
    }
  },

  undownvoteAnswer: function(answerId) {
    check(this.userId, String);
    check(answerId, String);

    var answers1 = Answers.findOne(answerId);

    if(! answers1)
      throw new Meteor.Error('invalid', "게시물이 존재하지 않습니다!");

    if(_.include(answers1.downvoters, this.userId))
      Answers.update(answers1._id, {
        $pull: {downvoters: this.userId},
        $inc: {votes:1}
      });
  }

}); //End Meteor methods