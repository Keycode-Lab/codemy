Posts = new Mongo.Collection('posts');

Meteor.methods({

  postSubmit: function (object) {
    check(this.userId, String);
    check(object, {
      title: String,
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
      title: object.title,
      content: object.content,
      user: {
        _id: user._id,
        username: user.username,
        //name: user.name
      },
      createdAt: now,
      updatedAt: now,
      votes : 0,

    };

    // write to database
    data._id = Posts.insert(data);

    return data._id;
  },

});