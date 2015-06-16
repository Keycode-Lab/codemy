Template.dropdownAnswerItem.helpers({
  ownPost: function () {
    var answer = Answers.findOne({_id: this._id});

    if (answer && answer.user && answer.user._id) {
      return Meteor.userId() === answer.user._id;
    }
  },
});