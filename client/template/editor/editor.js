Template.editor.events({
  'click .btn-submit': function (e, t) {
    e.preventDefault();

    var currentRoute = Router.current() && Router.current().route.getName();

    var object = {
      title: $('#editor-title').val(),
      content: $('#editor-content').val()
    };

    if (currentRoute === 'submit') {
      Meteor.call('postSubmit', object, function(error, result) {
        // display the error to the user and abort
        if (error){
          //return throwError('Something went wrong',error.reason);
        } else {
          // Change this to meteor call.
          // Meteor.call('updateLastPost', Meteor.userId());
          // //sAlert.success('Your question has been submitted successfully!');
          // throwSuccess('Question Submitted','Your question has been submitted successfully!');
          // //Router.go('postPage', {_id: result._id});
          // Router.go('/');
        }
      });
    }


  },
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

