Drafts = new Mongo.Collection('drafts');

Meteor.methods({

  saveDraft: function (object) {
    check(this.userId, String);
    check(object, {
      name: String,
      title: String,
      content: String,
    });

    // if ($.trim(object.title).length === 0) {
    //   // throw new Meteor.Error('There is no title')
    //   return false;
    // }

    // if ($.trim(object.content).length === 0) {
    //   // throw new Meteor.Error('There is no content')
    //   return false;
    // }

    // check permission
    if (! this.userId)
      throw new Meteor.Error(ERROR_CODE_SECURITY, "error_access_denied");

    // set input object
    var now = new Date();
    var user = Meteor.user();

    var data = {
      name: object.name,
      title: object.title,
      content: object.content,
      user: {
        _id: user._id,
        username: user.username,
        //name: user.name
      },
      createdAt: now,
      updatedAt: now
    };

    // write to database
    data._id = Drafts.insert(data);

    return data._id;
  },

});