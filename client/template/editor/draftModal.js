Template.draftModal.helpers({
  draft: function () {
    var userId = Meteor.userId();
    var draft = Drafts.find({'user._id': userId });

    if (userId && draft) {
      return draft;
    }
  }
});

Template.draftModal.events({
  'click li p': function () {
    var title = this.title;
    var content = this.content;

    $('#draftModal').modal('hide');

    $('#editor-title').val('');
    $('#editor-content').val('');

    $('#editor-title').val(title);
    $('#editor-content').val(content);


    // Update Editor Preview
    Session.set('editor-content', content);

    // Set Current Draft Mode
    Session.set('currentDraft', this._id);

    // Dirty hack to update counter
    $('#editor-title').focus();
    $('#editor-content').focus();
  },
  'click .btn-delete': function () {
    Drafts.remove(this._id);
  }
});
