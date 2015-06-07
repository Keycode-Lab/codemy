Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  var posts = Posts.find({}, options);

  return posts;
});

// Meteor.publish('comments', function(options) {
//   check(options, {
//     limit: Number
//   });
//   return Comments.find({}, options);
// });

Meteor.publish('comments', function (filter, options) {
    check(filter, {
        postId: String
    });
    check(options, {
        limit: Number
    });
    return Comments.find(filter, options);
});

Meteor.publish('draftsList', function (options) {
  check(options, {
      limit: Number
  });
  return Drafts.find({'user._id': this.userId}, options);
});

// Meteor.publish("userStatus", function(author) {
//   return Meteor.users.find(
//     {
//       _id: Meteor.users.findOne({_id: author})
//     },
//     {
//       fields: { status:1 }
//     }
//   );
// });


// // Codemy
// // Old Publication
// Meteor.publish("userStatus", function() {
//   return Meteor.users.find({ "status.online": true, userId: Posts.find(this._id).user._id },
//   {
//     fields: { status: 1 }
//   });
// });


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