Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  var posts = Posts.find({}, options);

  return posts;
});

Meteor.publish('comments', function (filter, options) {
    check(filter, {
        postId: String
    });
    check(options, {
        limit: Number
    });
    return Comments.find(filter, options);
});

Meteor.publish('answers', function (filter, options) {
    check(filter, {
        postId: String
    });
    check(options, {
        limit: Number
    });
    return Answers.find(filter, options);
});

Meteor.publish('commentAnswer', function(answerId, limit) {
  // check(filter, {
  //   answerId: String
  // });
  // check(options, {
  //   limit: Number
  // });
  // Meteor._sleepForMs(2000);
  return Comments.find({answerId: answerId}, {limit: limit});
});

Meteor.publish('draftsList', function (options) {
  check(options, {
      limit: Number
  });

  var drafts = Drafts.find({'user._id': this.userId}, options);

  return drafts;
});


Meteor.publish('singlePost', function (id) {
  check(id, String);
  return Posts.find(id);
});


// Mizzaos Answer
// https://github.com/mizzao/meteor-user-status/issues/56
Meteor.publish("userStatus", function (userId) {
  return Meteor.users.find({userId: userId },
    {
        fields: {
                  status:1,
                  "profile.cpoints": 1
                } // This only specifies what is published.
    });
});