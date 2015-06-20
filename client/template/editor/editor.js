Template.editor.onCreated( function () {
  var self = this;

  console.log('Editor Template Created')
  Session.set('currentDraft', null);

  // Set Default Value of Preview to default
  Session.set('editor-content', '**마크다운 미리보기**');
  Session.set('editor-title', null);

  Session.set('draftsLimit', 5);

});

Template.editor.onDestroyed( function () {
  console.log('Editor Template Destroyed')
  Session.set('currentDraft', null);
  Session.set('editor-content', null);
  Session.set('editor-title', null);
  Session.set('draftsLimit', null);

  if (Session.equals('autosaveState', true)) {
    // Turn Off Autostate if its on.
    window.clearInterval(Autosave);
  }

  // Turn Autosave off
  Session.set('autosaveState', false);

  /**
   * Deleting Sessions
   * http://stackoverflow.com/questions/10743703/how-do-i-delete-or-remove-session-variables
   */
  delete Session.keys['currentDraft'];
  delete Session.keys['editor-content'];
  delete Session.keys['editor-title'];
  delete Session.keys['editor-autosize']; // Does not delete?
  delete Session.keys['draftsLimit'];
  delete Session.keys['autosaveState'];
  delete Session.keys['previewState'];
});

Template.editor.helpers({
  draftMode: function () {
    var draftMode = Session.get('currentDraft');
    if (draftMode) {
      return 'Draft Mode';
    }
  }
});

Template.editor.events({
  'keyup #editor-title': function (e) {
    setTimeout(function(){
      e.preventDefault();
      var title =  $(e.target).val();
      Session.set('editor-title', '');
      Session.set('editor-title', title);
    },100);
  },
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
    var currentRoute = Router.current() && Router.current().route.getName();

    var tags = $('select.tagsinput').val();

    var tagsToLowerCase = [];

    for (var i = 0; i < tags.length; i++) {

            tagsToLowerCase.push(tags[i].toLowerCase());
    };

    // Submit Question
    if (currentRoute === 'submit') {
      var post = {
        title:    document.getElementById('editor-title').value,
        content:  document.getElementById('editor-content').value,
        tags: tagsToLowerCase
      }

      if ($.trim(post.title).length === 0) {
        return false;
      }

      if ($.trim(post.content).length === 0) {
        return false;
      }

      $('.btn-submit').addClass('btn-loading');
      $('.btn-submit').attr('disabled', true);

      Meteor.call('postSubmit', post, function(error, result) {
        // display the error to the user and abort
        if (error){
          throwError(error.reason);
          $('.btn-submit').removeClass('btn-loading');
          $('.btn-submit').attr('disabled', false);
        } else {
          if (Session.get('currentDraft') !== null) {

            var draft = Session.get('currentDraft');

            Meteor.call('draftRemove', draft, function(error, result) {
              if (error) {
                console.log(error.reason);
                throwError(error.reason);
                $('.btn-submit').removeClass('btn-loading');
                $('.btn-submit').attr('disabled', false);
                return false;
              } else {

              }
            });
          }

        $('.btn-submit').removeClass('btn-loading');
        $('.btn-submit').attr('disabled', false);

        Router.go('postPage', {_id: result});

        throwSuccess('질문이 성공적으로 등록됐습니다.')
      }

      });
    }

    // Edit Post
    if (currentRoute === 'postEdit') {

      var tags = $('select.tagsinput').val();

      var tagsToLowerCase = [];

      for (var i = 0; i < tags.length; i++) {
        tagsToLowerCase.push(tags[i].toLowerCase());
      };

      var post = {
        title:    document.getElementById('editor-title').value,
        content:  document.getElementById('editor-content').value,
        tags: tagsToLowerCase
      }

      var postId = Template.parentData()._id;

      if ($.trim(post.title).length === 0) {
        return false;
      }

      if ($.trim(post.content).length === 0) {
        return false;
      }

      $('.btn-submit').addClass('btn-loading');
      $('.btn-submit').attr('disabled', true);

      Meteor.call('postEdit', postId, post, function(error, result) {
        // display the error to the user and abort
        if (error){
          console.log(error.reason);
          throwError(error.reason);
        } else {
          if (Session.get('currentDraft') !== null) {

            var draft = Session.get('currentDraft');

            Meteor.call('draftRemove', draft, function(error, result) {
              if (error) {
                throwError(error.reason);
                console.log(error.reason);
                $('.btn-submit').removeClass('btn-loading');
                $('.btn-submit').attr('disabled', false);
                return false;
              } else {
                console.log('Draft Autosaved');
              }
            });
          }
          $('.btn-submit').removeClass('btn-loading');
          $('.btn-submit').attr('disabled', false);

          Router.go('/question/' + postId);

          throwSuccess('질문이 성공적으로 수정됐습니다.')
        }
      });
    }

    // Edit Answer
    if (currentRoute === 'answerEdit') {
      var answer = {
        content:  document.getElementById('editor-content').value
      }

      var answerId = Template.parentData()._id;

      var postId = Template.parentData().postId;

      if ($.trim(answer.content).length === 0) {
        return false;
      }

      $('.btn-submit').addClass('btn-loading');
      $('.btn-submit').attr('disabled', true);

      Meteor.call('answerEdit', answerId, answer, function(error, result) {
        // display the error to the user and abort
        if (error){
          console.log(error.reason);
          throwError(error.reason);
        } else {
          if (Session.get('currentDraft') !== null) {

            var draft = Session.get('currentDraft');

            Meteor.call('draftRemove', draft, function(error, result) {
              if (error) {
                console.log(error.reason);
                throwError(error.reason);
                $('.btn-submit').removeClass('btn-loading');
                $('.btn-submit').attr('disabled', false);
                return false;
              } else {
                console.log('Draft Autosaved');
              }
            });

          }
          $('.btn-submit').removeClass('btn-loading');
          $('.btn-submit').attr('disabled', false);
          Router.go('/question/' + postId);

          throwSuccess('답변이 성공적으로 수정됐습니다.')
        }
      });
    }

    // Submit Answer
    if (currentRoute === 'postPage') {
      var answer = {
        postId: Template.parentData()._id,
        content:  document.getElementById('editor-content').value
      }

      if ($.trim(answer.content).length === 0) {
        return false;
      }

      $('.btn-submit').addClass('btn-loading');
      $('.btn-submit').attr('disabled', true);

      Meteor.call('answerSubmit', answer, function(error, result) {
        // display the error to the user and abort
        if (error){
          throwError(error.reason);
        } else {
          if (Session.get('currentDraft') !== null) {

            var draft = Session.get('currentDraft');

            Meteor.call('draftRemove', draft, function(error, result) {
              if (error) {
                console.log(error.reason);
                $('.btn-submit').removeClass('btn-loading');
                $('.btn-submit').attr('disabled', false);
                return false;
              } else {
                console.log('Draft Autosaved');
              }
            });

          }
          $('.btn-submit').removeClass('btn-loading');
          $('.btn-submit').attr('disabled', false);

          throwSuccess('답변이 성공적으로 등록됐습니다.')

          document.getElementById('editor-content').value = "";
          Session.set('editor-content', '**마크다운 미리보기**');
        }
      });
    }
  },
  'click .btn-save-draft': function (e, t) {
    // e.preventDefault();
    // var post = {
    //   title:    document.getElementById('editor-title').value,
    //   content:  document.getElementById('editor-content').value
    // }

    // // if ($.trim(post.title).length === 0) {
    // //   return false;
    // // }

    // if ($.trim(post.content).length === 0) {
    //   return false;
    // }

    // var currentRoute = Router.current() && Router.current().route.getName();

    // // Submit Question
    // if (currentRoute === 'submit') {
    //   Meteor.call('saveDraft', post, function(error, result) {
    //     // display the error to the user and abort
    //     if (error){
    //       //return throwError('Something went wrong',error.reason);
    //     } else {
    //       // Router.go('/');
    //       console.log('draft saved');
    //     }
    //   });
    // }
  }
});

Template.editor.onRendered( function () {


  // Autosize of Content Text Area (this is a plugin)
  // $('#editor-content').autosize();

  if (Router.current() && Router.current().route.getName() === 'postEdit') {
    setTimeout( function () {
      liveUpdate($('#editor-content'));
    }, 200);
  }

  if (Router.current() && Router.current().route.getName() === 'answerEdit') {
    setTimeout( function () {
      liveUpdate($('#editor-content'));
    }, 200);
  }

  // Initialize BS Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  $('.modal').on('show.bs.modal', function() {
    //Make sure the modal and backdrop are siblings (changes the DOM)
    $(this).before($('.modal-backdrop'));
    //Make sure the z-index is higher than the backdrop
    $(this).css("z-index", parseInt($('.modal-backdrop').css('z-index')) + 1);
  });

  // Auto Update Loaded Draft
  this.autorun( function () {
    console.log('this.autorun in editor is running');
    if ((Session.get('currentDraft') !== null) && Session.equals('autosaveState', true)) {
      Autosave = window.setInterval( function () {
        console.log('Autosave is running now');
        var draft = Session.get('currentDraft');
        var draftContent = Drafts.findOne({_id: draft});
        var content =  $('#editor-content').val();

        if (draftContent.content !== content) {
          Drafts.update(draft, {$set: { content: content}}, function (error) {
            if (error) {
              console.log(error.reason);
            } else {
              console.log('updated draft');
            }
          });
        }
        if (Session.equals('autosaveState', false) || Session.equals('autosaveState', null)) {
          window.clearInterval(Autosave);
        }
      }, 5000);
    }
  });

  // Character Counter Title
  var title = $('input#editor-title');
  var titleCounter = $('.char-count-title');
  var titleHolder = $('.char-limit-title');
  charCounter(100, title, titleCounter, titleHolder);

  // Character Counter Content
  var content = $('textarea#editor-content');
  var contentCounter = $('.char-count-content');
  var contentHolder = $('.char-limit-content');
  charCounter(10000, content, contentCounter, contentHolder);

  var textarea = document.getElementById('editor-content');
  // var editor = new Behave({
  //   textarea: document.getElementById('editor-content')
  // });
  // // tabIndent.render(textarea);
  // editor.init(textarea);

  // Tags
  $('.tagsinput').tagsinput({
    confirmKeys: [13, 32], //Enter Space Comma
    maxTags: 5,
    trimValue: true,
    maxChars: 16,
    tagClass: 'label label-default tagCustom'
  });

  $('.bootstrap-tagsinput input').on('keydown keyup', function () {
    var keyCode = event.keyCode || event.which;

    // if (keyCode === 32) {
    //   event.preventDefault();
    // }

    if (keyCode === 182 || keyCode === 188) {
      event.preventDefault();
    }
  });

});

