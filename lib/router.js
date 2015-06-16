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



Router.route('question/edit/:_id', {
  name: 'postEdit',
  subscriptions: function () {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('draftsList', {
        limit: Number(Session.get('draftsLimit'))
       })
    ];
  },
  data: function() {
     return Posts.findOne({_id:this.params._id});
  },
});

Router.route('answer/edit/:_id', {
  name: 'answerEdit',
  subscriptions: function () {
    return [
      Meteor.subscribe('singleAnswer', this.params._id),
      Meteor.subscribe('draftsList', {
        limit: Number(Session.get('draftsLimit'))
       })
    ];
  },
  data: function() {
     return Answers.findOne({_id:this.params._id});
  },
});

Router.route('settings', {
  name: 'settings'
});

Router.route('account', {
  name: 'account'
});



/**
 * [postPage description]
 * subscriptions : singlePost
 *                 userStatus
 *                 comments
 */
    Router.route('/question/:_id', {
      name: 'postPage',
      // limit: function () {
      //   return
      // }
      subscriptions: function () {
        return [
          Meteor.subscribe('singlePost', this.params._id),
          Meteor.subscribe('userStatus'),
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
 * [OnBeforeActions description]
 * @loginRequired : renders signin page if needed
 *                  redirects to intended page when signed in
 *
 */
OnBeforeActions = {
  loginRequired: function () {
    if (! Meteor.userId()) {
      this.render('signin');
    } else {
      this.next();
    }
  },
  scroll: function () {
    $('.navbar-codemy').removeClass('nav-up');
    $('body,html').scrollTop(0);
    this.next();
  }
};


Router.onBeforeAction(OnBeforeActions.scroll);

/**
 * [loginRequired only descriptions]
 * Initiate loginRequired before routes in only: array
 */
Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['submit', 'settings', 'account']
});