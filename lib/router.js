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

Router.route('/posts/:_id', {
  name: 'postPage',
  subscriptions: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
    ];
  },
  data: function() {
    return Posts.findOne({_id:this.params._id});
   },
});