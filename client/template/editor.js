Template.editor.events({
  'keyup #editor-content': function (e) {
    setTimeout(function(){
      e.preventDefault();
      var content =  $(e.target).val();
      Session.set('editor-content', '');
      Session.set('editor-content', content);
    },100);
  },
  'click .btn-preview': function (e) {
    var $editorWrapper = $('.editor-wrapper');
    if ( $editorWrapper.hasClass('show-preview') ) {
      $editorWrapper.removeClass('show-preview');
    } else {
      $editorWrapper.addClass('show-preview');
    }
  }
});

Template.editor.onRendered( function () {
  // Autosize of Content Text Area (this is a plugin)
  $('#editor-content').autosize();

  // Set Default Value of Preview to default
  Session.set('editor-content', '**마크다운 미리보기**');
});

