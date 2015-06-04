// Meteor.publish('posts', function(options) {
//   check(options, {
//     sort: Object,
//     limit: Number
//   });
//   var posts = Posts.find({}, options);

//   return posts;
// });

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


// Mizzaos Answer
// https://github.com/mizzao/meteor-user-status/issues/56
Meteor.publish("userStatus", function(userId) {
  return Meteor.users.find({ "status.online": true, userId: userId },
    {
        fields: { status:1 } // This only specifies what is published.
    });
});