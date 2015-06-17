Template.linkModal.events({
  'keyup input': function (event) {
    // setTimeout(function(){
    //   event.preventDefault();
    //   var title =  $(event.target).val();
    //   Session.set('link-preview', '');
    //   Session.set('link-preview', title);
    // },100);
  },
  'click .btn-save': function (event) {
      var editor = $('#editor-content');
      var select = getSelected(editor);

      editor.focus();

      var editor = document.getElementById ("editor-content");
      var link   = document.createEvent('TextEvent');

      var href = $('.add-link').val();

      link.initTextEvent('textInput', true, true, null, "http://" + href + " ");
      editor.dispatchEvent(link);

      var editor = $('#editor-content');
      liveUpdate(editor);

      $('#linkModal').modal('hide');
  }
});