Meteor.methods({
  updateInfo: function (userId,newInfo) {
    Meteor.users.update( userId , { $set: { 'profile.info': newInfo }} );
  },
  updateLastPost: function (userId) {
    Meteor.users.update(userId, {$set:{"profile.lastPost":new Date()}});
  },
  updateLastAnswer: function (userId) {
    Meteor.users.update(userId, {$set:{"profile.lastAnswer":new Date()}});
  },
  upvoteUser: function (userId){
    Meteor.users.update(
      userId,
      {$inc : { 'profile.cpoints' : 3 }}
    );
  },
  unvoteUser: function (userId){
    Meteor.users.update(
      userId,
      {$inc : { 'profile.cpoints' : -3 }}
    );
  },
  viewCount: function (postId) {
    // check if the user hasn't visited this question already
    var user = Meteor.users.findOne({_id:this.userId, "profile.visited":{$ne:postId}});

    if (user) {
      // increment the question view count and add the question to the user's visited page
      Meteor.users.update({_id:this.userId},{$addToSet:{"profile.visited" :postId}});
      Posts.update({_id:postId},{$inc:{views:1}});
      return true;
    } else {
      return false;
    }
  },
  checkAnswer: function (answerId, postId, userId) {
    check(answerId, String);
    check(postId, String);
    check(userId, String);

    Answers.update({
      _id: answerId,
    }, {
      $set: {checked: true}
    });

    Posts.update({
      _id: postId,
    }, {
      $set: {answered: true}
    });

    Meteor.users.update( userId,
      {$inc : { 'profile.cpoints': 15 }}
    );
  },
  uncheckAnswer: function (answerId, postId, userId) {
    check(answerId, String);
    check(postId, String);
    check(userId, String);

    Answers.update({
      _id: answerId,
    }, {
      $set: {checked: false}
    });

    Posts.update({
      _id: postId,
    }, {
      $set: {answered: false}
    });

    Meteor.users.update( userId,
      {$inc : { 'profile.cpoints': -15 }}
    );
  },
});


