Drafts = new Mongo.Collection('drafts');

// Drafts.allow({
//   update: function (userId, drafts) {
//     return ownsDocument(userId, drafts);
//   },
//   remove: function(userId, post) { return [ ownsDocument(userId, post), Meteor.users.findOne({'profile.role': 'admin'}) ]; },
// });

Meteor.methods({

  saveDraft: function (object) {
    check(this.userId, String);
    check(object, {
      // name: String,
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
      // name: object.name,
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

  saveLoad: function(draftId, object) {
    check(draftId, String);
    check(object, {
      // name: String,
      title: String,
      content: String,
    });

    // check permission
    if (! this.userId)
      throw new Meteor.Error(403, "error_access_denied");

    var draft = Drafts.findOne({ _id: draftId });

    if ( draft.user._id != this.userId ) {
      return false;
    }

    // make input object
    var now = new Date();
    var data = {
      title: object.title,
      content: object.content,
      updatedAt: now
    };

    // update the database
    var updated = Drafts.update({ _id: draftId, 'user._id': this.userId }, { $set: data });
    return updated;
  },

  draftRemove: function(draftId) {

    // check permission
    if (! this.userId)
      throw new Meteor.Error(403, "error_access_denied");

    // remove the blog
    var removed = Drafts.remove({ _id: draftId, 'user._id': this.userId });
    return removed;
  }
});