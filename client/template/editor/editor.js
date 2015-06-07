Template.editor.onCreated( function () {
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
    var post = {
      title:    document.getElementById('editor-title').value,
      content:  document.getElementById('editor-content').value
    }

    if ($.trim(post.title).length === 0) {
      return false;
    }

    if ($.trim(post.content).length === 0) {
      return false;
    }

    var currentRoute = Router.current() && Router.current().route.getName();

    // Submit Question
    if (currentRoute === 'submit') {
      Meteor.call('postSubmit', post, function(error, result) {
        // display the error to the user and abort
        if (error){
          //return throwError('Something went wrong',error.reason);
        } else {
          if (Session.get('currentDraft') !== null) {

            var draft = Session.get('currentDraft');

            Meteor.call('draftRemove', draft, function(error, result) {
              if (error) {
                console.log(error.reason);
              } else {
                console.log('Draft Autosaved');
              }
            });

          Router.go('/');

          }

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
});

