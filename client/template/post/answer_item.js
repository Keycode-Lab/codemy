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
  },
  ownPost: function () {
    var post = Posts.findOne({_id: this.postId}).user._id;
    return Meteor.userId() === post;
  },
  checkedState: function () {
    var self = this;
    if (self && (self.checked === true)) {
      return 'checked';
    } else {
      return null;
    }
  },
  checkDisabled: function () {
    var postId = this.postId;
    var checked = this.checked;
    var post = Posts.findOne({_id: postId});
    var userId = Meteor.userId();

    // If Answerer is OP disable check
    if (this && this.user && (this.user._id === userId)) {
      return 'disabled';
    }

    // If Answered return disabled.
    if (postId && post && (checked === false) && (post.answered === true)) {
      return 'disabled';
    } else {
      return null;
    }
  },
  checkedAnswer: function () {
    return this.checked;
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
  },
  'click .answer-check': function (event, template) {
    if (template.$('.answer-check').hasClass('checked')) {
      template.$('.answer-check').removeClass('checked');
      Meteor.call('uncheckAnswer', this._id, this.postId, this.user._id);
    } else {
      template.$('.answer-check').addClass('checked');
      Meteor.call('checkAnswer', this._id, this.postId, this.user._id);
    }
  },
  'click .btn-confirm-delete': function (event) {
    // Call Method to delete here
    var id = '#answer-'+this._id;
    console.log(this._id)
    console.log(this.user._id)

    if ($(event.target).parent().is(id)) {
      Meteor.call('answerRemove', this.user._id, this.postId, this._id, function (error, result) {
        if (error) {
          console.log(error);
          throwError(error.reason);
        } else {
          throwSuccess('답변이 성공적으로 삭제됐습니다.')
        }
      });
    }
  },
});

Template.answerItem.onRendered( function () {
  this.$('.comment-wrapper').hide();
});