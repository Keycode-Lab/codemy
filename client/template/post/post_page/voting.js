Template.voting.onRendered( function () {
  var $downvote = this.$('.downvote');
  var $upvote = this.$('.upvote');

  if ($upvote.hasClass('unvote')) {
    $downvote.prop('disabled', true);
  }
  if ($downvote.hasClass('undownvote')) {
    $upvote.prop('disabled', true);
  }

});

Template.voting.helpers({
  upvotedClass: function() {
    if (Meteor.user()) {
      var userId = Meteor.userId();
      if (userId && !_.include(this.upvoters, userId)) {
        return 'upvotable';
      }  else {
        return 'unvote';
      }
    }

  },
  downvotedClass: function() {
    if (Meteor.user()) {
      var userId = Meteor.userId();
      if (userId && !_.include(this.downvoters, userId)) {
        return 'downvotable';
      } else {
        return 'undownvote';
      }
    }
  }
});

Template.voting.events({
  'click .upvotable': function (event, template) {
    event.preventDefault();
    console.log('upvoted');
    template.$('.downvotable').prop('disabled', true);
    Meteor.call('upvote', this._id);
    Meteor.call('upvoteUser', this.user._id);
  },

  'click .unvote': function (event, template) {
    event.preventDefault();
    template.$('.downvotable').prop('disabled', false);
    Meteor.call('unvote', this._id);
    Meteor.call('unvoteUser', this.user._id);
  },

  'click .downvotable': function (event, template) {
    event.preventDefault();
    console.log('downvoted');
    template.$('.upvotable').prop('disabled', true);
    Meteor.call('downvote', this._id);
    Meteor.call('unvoteUser', this.user._id);
  },

  'click .undownvote': function (event, template) {
    event.preventDefault();
    template.$('.upvotable').prop('disabled', false);
    Meteor.call('undownvote', this._id);
    Meteor.call('upvoteUser', this.user._id);
  }

});

/**
 *
 *
 *
 *
 *
 */

Template.votingAnswer.onRendered( function () {
  var $downvote = this.$('.downvote');
  var $upvote = this.$('.upvote');

    if ($upvote.hasClass('unvote')) {
      $downvote.prop('disabled', true);
    }
    if ($downvote.hasClass('undownvote')) {
      $upvote.prop('disabled', true);
    }

});

Template.votingAnswer.helpers({
  upvotedClass: function() {
    if (Meteor.user()) {
      var userId = Meteor.userId();
      if (userId && !_.include(this.upvoters, userId)) {
        return 'upvotable';
      }  else {
        return 'unvote';
      }
    }

  },
  downvotedClass: function() {
    if (Meteor.user()) {
      var userId = Meteor.userId();
      if (userId && !_.include(this.downvoters, userId)) {
        return 'downvotable';
      } else {
        return 'undownvote';
      }
    }
  }
});

Template.votingAnswer.events({
  'click .upvotable': function (event, template) {
    event.preventDefault();
    template.$('.downvotable').prop('disabled', true);
    Meteor.call('upvoteAnswer', this._id);
    Meteor.call('upvoteUser', this.user._id);
  },

  'click .unvote': function (event, template) {
    event.preventDefault();
    template.$('.downvotable').prop('disabled', false);
    Meteor.call('unvoteAnswer', this._id);
    Meteor.call('unvoteUser', this.user._id);
  },

  'click .downvotable': function (event, template) {
    event.preventDefault();
    template.$('.upvotable').prop('disabled', true);
    Meteor.call('downvoteAnswer', this._id);
    Meteor.call('unvoteUser', this.user._id);
  },

  'click .undownvote': function (event, template) {
    event.preventDefault();
    template.$('.upvotable').prop('disabled', false);
    Meteor.call('undownvoteAnswer', this._id);
    Meteor.call('upvoteUser', this.user._id);
  }

});