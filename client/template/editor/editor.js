Template.editor.events({
  'keyup #editor-content': function (e) {
    setTimeout(function(){
      e.preventDefault();
      var content =  $(e.target).val();
      Session.set('editor-content', '');
      Session.set('editor-content', content);
    },100);
  }
});

Template.editor.onRendered( function () {
  // Autosize of Content Text Area (this is a plugin)
  $('#editor-content').autosize();

  // Set Default Value of Preview to default
  Session.set('editor-content', '**마크다운 미리보기**');

  // Character Counter Title
  var title = $('input#editor-title');
  var titleCounter = $('.char-count-title');
  charCounter(50, title, titleCounter);

  // Character Counter Content
  var content = $('textarea#editor-content');
  var contentCounter = $('.char-count-content');
  charCounter(10000, content, contentCounter);

  var textarea = document.getElementById('editor-content');
  var editor = new Behave({
    textarea: document.getElementById('editor-content')
  });
  // tabIndent.render(textarea);
  // editor.init(textarea);
});

