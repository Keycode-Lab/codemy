Template.editor.events({
  'keyup #editor-content': function (e) {
    setTimeout(function(){
      e.preventDefault();
      var content =  $(e.target).val();
      Session.set('editor-content', '');
      Session.set('editor-content', content);
    },100);
  },
  'click .btn-submit': function (e, t) {
    e.preventDefault();
    var post = {
      title:    document.getElementById('editor-title').value,
      content:  document.getElementById('editor-content').value
    }

    var currentRoute = Router.current() && Router.current().route.getName();

    // Submit Question
    if (currentRoute === 'submit') {
      Meteor.call('postSubmit', post, function(error, result) {
        // display the error to the user and abort
        if (error){
          //return throwError('Something went wrong',error.reason);
        } else {
          Router.go('/');
        }
      });
    }
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
  var titleHolder = $('.char-limit-title');
  charCounter(70, title, titleCounter, titleHolder);

  // Character Counter Content
  var content = $('textarea#editor-content');
  var contentCounter = $('.char-count-content');
  var contentHolder = $('.char-limit-content');
  charCounter(10000, content, contentCounter, contentHolder);

  var textarea = document.getElementById('editor-content');
  var editor = new Behave({
    textarea: document.getElementById('editor-content')
  });
  // tabIndent.render(textarea);
  // editor.init(textarea);
});

