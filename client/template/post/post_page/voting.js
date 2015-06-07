Template.voting.rendered = function() {
  var $downvote = this.$('.downvote');
  var $upvote = this.$('.upvote');

  if($upvote.hasClass('unvote'))
    $downvote.prop('disabled', true);

  if($downvote.hasClass('undownvote'))
    $upvote.prop('disabled', true);
}



Template.voting.helpers({

  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'upvotable';
    }  else {
      return 'unvote';
    }
  },
  downvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.downvoters, userId)) {
      return 'downvotable';
    } else {
      return 'undownvote';
    }
  }

});


Template.voting.events({

  'click .upvotable': function(e,t) {
    e.preventDefault();
    t.$('.downvotable').prop('disabled', true);
    Meteor.call('upvote', this._id);
    Meteor.call('upvoteUser', this.userId);
  },

  'click .unvote': function(e,t) {
    e.preventDefault();
    t.$('.downvotable').prop('disabled', false);
    Meteor.call('unvote', this._id);
    Meteor.call('unvoteUser', this.userId);
  },

  'click .downvotable': function(e,t) {
    e.preventDefault();
    t.$('.upvotable').prop('disabled', true);
    Meteor.call('downvote', this._id);
    Meteor.call('unvoteUser', this.userId);
  },

  'click .undownvote': function(e,t) {
    e.preventDefault();
    t.$('.upvotable').prop('disabled', false);
    Meteor.call('undownvote', this._id);
    Meteor.call('upvoteUser', this.userId);
  }

})