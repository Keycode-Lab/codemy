Template.draftModal.helpers({
  draft: function () {
    var userId = Meteor.userId();
    var draft = Drafts.find({'user._id': userId });

    if (userId && draft) {
      return draft;
    }
  },
  draftCount: function () {
    var userId = Meteor.userId();
    var draft = Drafts.find({'user._id': userId });

    if (userId && draft) {
      return draft.count();
    }
  }
});

Template.draftModal.events({
  'click li a': function () {
    var title = this.title;
    var content = this.content;

    $('#draftModal').modal('hide');

    // Empty Editor Values
    $('#editor-title').val('');
    $('#editor-content').val('');

    // Set Editor Values to Draft Values
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
    if (this._id === Session.get('currentDraft')) {
      // Deleting when you are working on the draft to delete
      console.log('You are deleting your current post')

      // Remove Draft from DB
      Drafts.remove(this._id);

      // Revert Sessions to none-draft state
      Session.set('currentDraft', null);
      Session.set('autosaveState', null);

      // Hide Modal
      $('#draftModal').modal('hide');
    } else {

      Drafts.remove(this._id);
    }

  }
});
