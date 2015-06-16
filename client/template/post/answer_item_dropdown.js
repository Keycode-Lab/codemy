Template.dropdownAnswerItem.helpers({
  ownPost: function () {
    var answer = Answers.findOne({_id: this._id});

    if (answer && answer.user && answer.user._id) {
      return Meteor.userId() === answer.user._id;
    }
  }
});

Template.dropdownAnswerItem.events({
  'click .answer-delete': function (event, template) {
    var id = '#answer-'+this._id;

    if ($('.delete-confirm').is(id)) {
      $(id).slideToggle(300);
    }
  },
  'click .answer-edit': function (event, template) {
    // Router.go('postPage', {_id: this.postId}, {hash : 'edit/'+this._id});
  }
});