/**
 *  Template level subscription
 *  (answerItem.onCreated)
 *  refer to..
 *    https://www.discovermeteor.com/blog/template-level-subscriptions/
 */

Template.answerItem.onCreated( function () {
  // Initialization
  var instance = this;

  // Initiate Reactive Variables
  instance.loaded = new ReactiveVar(0);
  instance.limit  = new ReactiveVar(5);

  // Autorun
  // will re-run when the "limit" reactive variables changes
  instance.autorun(function () {
    var limit = instance.limit.get();
    var answerId = instance.data._id;

    // Subscribe
    var subscription = instance.subscribe('commentAnswer', answerId, limit);

    // if subscription is ready, set limit to newLimit
    if (subscription.ready()) {
      instance.loaded.set(limit);
    } else {
      // Not Loaded Yet
    }
  });

  // Answer Limit Cursor
  instance.commentAnswer = function() {
    return Comments.find({answerId: instance.data._id }, {limit: instance.loaded.get()});
  }

});

Template.answerItem.onDestroyed( function () {

});

Template.answerItem.helpers({
  commentAnswer: function () {
    return Template.instance().commentAnswer();
  },
  nextPath: function () {
    return Template.instance().commentAnswer().count() >= Template.instance().limit.get();
  }
});

Template.answerItem.events({
  'click a.add-comment': function (event, template) {
    /**
     * $(event.target) = 'text of a.add-comment'
     * $(event.target).parent() = a.add-comment
     */
    $(event.target).parent().siblings('.comment-wrapper').show();
    $(event.target).hide();
  },
  'click a.load-more-commentAnswer': function (event) {
    event.preventDefault();

    // get current value for limit, i.e. how many posts are currently displayed
    var limit = Template.instance().limit.get();

    // increase limit by 5 and update it
    limit += 5;
    Template.instance().limit.set(limit);
  }
});

Template.answerItem.onRendered( function () {
  this.$('.comment-wrapper').hide();
});