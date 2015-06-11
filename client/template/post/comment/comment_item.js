Template.commentItem.helpers({
  // hammerInitOptions: function () {
  //   return function (hammer, templateInstance) {
  //     var swipeleft = new Hammer.Swipe({
  //       event: 'swipeleft',  prefix for custom swipe events, e.g. 2fingerswipeleft, 2fingerswiperight
  //       pointers: 1,
  //       velocity: 0.5
  //     });
  //     hammer.add(swipeleft);
  //     return hammer;
  //   }
  // },

  // Needs more work
  // commentOp: function () {
  //   var post = Posts.findOne({_id: this._id});
  //   if (post && post.user && post.user._id) {
  //     var author          = Meteor.users.findOne({_id: post.user._id});
  //     var commentAuthorId = this.user._id;
  //     var commentAuthor   = Meteor.users.findOne({_id: commentAuthorId});

  //     if (author === commentAuthor) {
  //       return 'comment-op';
  //     }
  //   }
  // }
});