Template.answerItem.events({
  'click a.add-comment': function (event, template) {
    /**
     * $(event.target) = 'text of a.add-comment'
     * $(event.target).parent() = a.add-comment
     */
    $(event.target).parent().siblings('.comment-wrapper').show();
    $(event.target).hide();
  },
});

Template.answerItem.onRendered( function () {
  this.$('.comment-wrapper').hide();
});