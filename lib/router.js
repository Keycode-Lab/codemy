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
  name: 'submit',
  subscriptions: function () {
    return [
     Meteor.subscribe('draftsList', {
      limit: Number(Session.get('draftsLimit'))
     })
    ];
  }
});

Router.route('settings', {
  name: 'settings'
});


/**
 * [postPage description]
 * subscriptions : singlePost
 *                 userStatus
 *                 comments
 */
    Router.route('/posts/:_id', {
      name: 'postPage',
      // limit: function () {
      //   return
      // }
      subscriptions: function () {
        return [
          Meteor.subscribe('singlePost', this.params._id),
          Meteor.subscribe('userStatus'),
          Meteor.subscribe('draftsList'),
          Meteor.subscribe('draftsList', {
            limit: Number(Session.get('draftsLimit'))
          }),
          Meteor.subscribe('comments', {
              postId: this.params._id
            }, {
              limit: Number(Session.get('commentLimit'))
          }),
          Meteor.subscribe('answers', {
              postId: this.params._id
            }, {
              limit: Number(Session.get('answerLimit'))
          })
        ];
      },
      data: function() {
        return Posts.findOne({_id:this.params._id});
       },
    });

/**
 * [Account Description]
 *
 */

Router.route('/account', {
  name: 'accountMain'
});

/**
 * [OnBeforeActions description]
 * @loginRequired : renders signin page if needed
 *                  redirects to intended page when signed in
 *
 */
OnBeforeActions = {
  loginRequired: function() {
    if (! Meteor.userId()) {
      this.render('signin');
    } else {
      this.next();
    }
  }
};

/**
 * [loginRequired only descriptions]
 * Initiate loginRequired before routes in only: array
 */
Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['submit', 'settings']
});