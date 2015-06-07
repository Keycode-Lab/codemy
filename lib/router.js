Router.configure({
  layoutTemplate : 'layout',
});

Router.route('/signin', {
  name: 'signin',
});

Router.route('/register', {
  name: 'register',
});

Router.route('/submit', {
  name: 'submit'
});

// Router.route('/posts/:_id', {
//   name: 'postPage',
//   subscriptions: function() {
//     var author   = Posts.findOne({_id: this.params._id});
//     var authorId = author && author.user && author.user._id;
//     return [
//       Meteor.subscribe('singlePost', this.params._id),
//       Meteor.subscribe('userStatus', authorId),
//     ];
//   },
//   data: function() {
//     return Posts.findOne({_id:this.params._id});
//    },
// });


Router.route('/posts/:_id', {
  name: 'postPage',
  comments: function () {
    return Comments.find({}, this.commentLimit());
  },
  subscriptions: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('userStatus'),
      Meteor.subscribe('comments', {
        limit: parseInt(Session.get('commentLimit'))
      })
    ];
  },
  data: function() {
    return Posts.findOne({_id:this.params._id});
   },
});

OnBeforeActions = {
  loginRequired: function() {
    if (!Meteor.userId()) {
      this.render('signin');
    } else {
      this.next();
    }
  }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['submit']
});