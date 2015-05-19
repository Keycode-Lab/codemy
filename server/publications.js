Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  var posts = Posts.find({}, options);

  return posts;
});
