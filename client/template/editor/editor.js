Template.editor.destoryed = function () {
  Session.set(currentDraft, null);
}

Template.draftSaveModal.onRendered( function () {
  $('#draft-name').val($('#editor-title').val());
});

Template.draftSaveModal.events({
  'click .btn-save': function (e, t) {
    e.preventDefault();
    var post = {
      name :    document.getElementById('draft-name').value,
      title:    document.getElementById('editor-title').value,
      content:  document.getElementById('editor-content').value
    }

    // if ($.trim(post.title).length === 0) {
    //   return false;
    // }

    // if ($.trim(post.content).length === 0) {
    //   return false;
    // }

    var currentRoute = Router.current() && Router.current().route.getName();

    // Submit Question
    if (currentRoute === 'submit') {
      Meteor.call('saveDraft', post, function(error, result) {
        // display the error to the user and abort
        if (error){
          //return throwError('Something went wrong',error.reason);
        } else {
          // Router.go('/');
          console.log('draft saved');
          $('#draftSaveModal').modal('hide');
        }
      });
    }
  }
});

Template.draftModal.helpers({
  draft: function () {
    var user = Meteor.userId();
    var draft = Drafts.find({'user._id': user });

    if (user && draft) {
      return draft;
    }
  }
});

Template.draftModal.events({
  'click li p': function () {
    var title = this.title;
    var content = this.content;

    $('#draftModal').modal('hide');

    $('#editor-title').val(title);
    $('#editor-content').val(content);

    // Update Editor Preview
    Session.set('editor-content', content);

    // Set Current Draft Mode
    Session.set('currentDraft', this._id);
  },
  'click .btn-delete': function () {
    Drafts.remove(this._id);
  }
});

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
          Router.go('/');
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

  // Set Default Value of Preview to default
  Session.set('editor-content', '**마크다운 미리보기**');

  // Set Content to latest draft
      // this.autorun( function () {
      //   var user = Meteor.userId();
      //   var draft = Drafts.find({'user._id': user });

      //   if (user && draft) {
      //     // $('#draftModal').modal('show');
      //     // $('#draftModal').css('z-index', '9999');

      //     var title   = draft.title;
      //     var content = draft.content;

      //     $('#editor-title').val(title);
      //     $('#editor-content').val(content);

      //     Session.set('editor-content', content);
      //   }
      // });


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

