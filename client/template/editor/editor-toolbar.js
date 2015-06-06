Template.editorToolbar.onCreated( function () {
  // Turn Autosave off
  Session.set('autosaveState', false);

  // Turn Autosize off
  Session.set('editor-autosize', false);

  // Set previewState to Default (true)
  Session.set('previewState', true);
});

Template.editorToolbar.onDestroyed( function () {
  Session.set('editor-autosize', false);
});

Template.editorToolbar.helpers({
  /**
   *  Loaded Draft
   */
  loadedDraft: function () {
    return Session.get('currentDraft');
  },

  /**
   *
   *  XState = shows on or off of X
   *  XStateColor = shows color of X
   *
   */
  previewState: function () {
    if (Session.equals('previewState', true)) {
      return 'on';
    } else {
      return 'off';
    }
  },
  previewStateColor: function () {
    if (Session.equals('previewState', true)) {
      return 'badge-green';
    } else {
      return 'badge-red';
    }
  },
  autosaveState: function () {
    if  (Session.equals('autosaveState', true)) {
      return 'on';
    } else {
      return 'off';
    }
  },
  autosaveStateColor: function () {
    if (Session.equals('autosaveState', true)) {
      return 'badge-green';
    } else {
      return 'badge-red';
    }
  },
  autosizeState: function () {
    if  (Session.equals('editor-autosize', true)) {
      return 'on';
    } else {
      return 'off';
    }
  },
  autosizeStateColor: function () {
    if (Session.equals('editor-autosize', true)) {
      return 'badge-green';
    } else {
      return 'badge-red';
    }
  },
});

Template.editorToolbar.events({

  /**
   *    Editor Settings Events
   */

  // Preview Toggle
  'click .btn-preview': function (e) {
    // Apply 'editor-state' Classes here
    var $editorWrapper = $('.editor-wrapper');

    if ( $editorWrapper.hasClass('show-preview') ) {
      // if preview-mode, turn off
      $editorWrapper.removeClass('show-preview');
      Session.set('previewState', false);
    } else {
      // if not preview-mode, turn on
      $editorWrapper.addClass('show-preview');
      Session.set('previewState', true);
    }
  },


  // New
  'click .btn-new': function () {
    // textarea#editor-content
    var editor = $('#editor-content');

    // Clear Title and Content
    $('#editor-title').val('');
    $('#editor-content').val('');

    // Dirty hack to update counter
    $('#editor-title').focus();
    $('#editor-content').focus();

    Session.set('currentDraft', null);

    if (Session.equals('autosaveState', true)) {
      window.clearInterval(Autosave);
    }

    liveUpdate(editor);
  },

  // Autosize toggle
  'click .btn-autosize': function () {
    if (Session.equals('editor-autosize', true)) {
      // If autosize, turn off
      var ta = $('#editor-content');
      // remove autosize from ta
      ta.trigger('autosize.destroy');
      Session.set('editor-autosize', false);
    } else {
      // If not autosize, turn on
      var ta = $('#editor-content')
      ta.autosize();
      Session.set('editor-autosize', true);
    }
    editor.focus();
  },

  // Save button when Draft Exists (Update loaded/current draft)
  'click .btn-save-loaded': function () {
    // draft = draft _id
    var draft = Session.get('currentDraft');

    var title = $('#editor-title').val();
    var content =  $('#editor-content').val();

    var object = {
      title: title,
      content: content
    }

    Meteor.call('saveLoad', draft, object, function(error, result) {
      if (error) {
        console.log(error.reason);
      } else {
        console.log('Draft Saved');

        // Session.set('currentDraft', result);
      }
    });
  },

  // Toggle Autosave
  // Toggle autosave sessions. this.autorun listens for session boolean change
  'click .btn-autosave': function () {
    if (Session.equals('autosaveState', false)) {
      // if not autosave, turn on
      Session.set('autosaveState', true);
    } else {
      // if autosave, turn off
      Session.set('autosaveState', false);
    }
  },

  // Toggle Markdown Cheatsheet (deprecated for now)
  /*
  'click .btn-markdown': function () {
    $('#wrapper').toggleClass('sidebar-right-markdown');
  },
  */

  /**
   *    Editor Markdown Toolbar
   */

  //
  'click .e-bold': function () {
    var editor = $('#editor-content');
    var select = getSelected(editor);

    editor.focus();

    if (getSelectionText().length >= 1) {
      var editor = document.getElementById ("editor-content");
      var bold   = document.createEvent('TextEvent');
      bold.initTextEvent('textInput', true, true, null, "**"+select[2]+"**");
      editor.dispatchEvent(bold);
    } else {
      var editor = document.getElementById ("editor-content");
      var bold   = document.createEvent('TextEvent');
      bold.initTextEvent('textInput', true, true, null, "**"+"boldtext"+"**");
      editor.dispatchEvent(bold);
      editor.selectionStart -= 10;
      editor.selectionEnd   -= 2;
    }

    var editor = $('#editor-content');
    liveUpdate(editor);
  },
  'click .e-italic': function () {
    var editor = $('#editor-content');
    var select = getSelected(editor);

    editor.focus();

    if (getSelectionText().length >= 1) {
      var editor = document.getElementById ("editor-content");
      var italic = document.createEvent('TextEvent');
      italic.initTextEvent('textInput', true, true, null, "*"+select[2]+"*");
      editor.dispatchEvent(italic);
    } else {
      var editor = document.getElementById ("editor-content");
      var italic = document.createEvent('TextEvent');
      italic.initTextEvent('textInput', true, true, null, "*"+"italic"+"*");
      editor.dispatchEvent(italic);
      editor.selectionStart -= 7;
      editor.selectionEnd   -= 1;
    }

    var editor = $('#editor-content');
    liveUpdate(editor);
  },
  'click .e-code': function () {
    var editor = $('#editor-content');
    var select = getSelected(editor);

    editor.focus();
    if (getSelectionText().length >= 1) {
      var editor = document.getElementById ("editor-content");
      var code = document.createEvent('TextEvent');
      code.initTextEvent('textInput', true, true, null, "```" + "\n" + select[2] + "\n" + "```");
      editor.dispatchEvent(code);
    } else {
      var editor = document.getElementById ("editor-content");
      var code = document.createEvent('TextEvent');
      code.initTextEvent('textInput', true, true, null, "```"+"codeblock"+"```");
      editor.dispatchEvent(code);
      editor.selectionStart -= 12;
      editor.selectionEnd   -= 3;
    }

    var editor = $('#editor-content');
    liveUpdate(editor);
  },
  'click .e-blockquote': function () {
    var editor = $('#editor-content');
    var select = getSelected(editor);

    editor.focus();

    if (getSelectionText().length >= 1) {
      var selected = getHighlight(editor);
      var newVal = selected.toString(); // .split(",").join("\n");

      var eachLines = newVal.split('\n');
      var newLines = [];

      for ( i = 0; i < eachLines.length; i++) {
        var editor = document.getElementById ("editor-content");
        var blockquote = document.createEvent('TextEvent');
        blockquote.initTextEvent('textInput', true, true, null, "> " + eachLines[i] + "\n");
        editor.dispatchEvent(blockquote);
      }
    } else {
      var editor = document.getElementById ("editor-content");
      var blockquote = document.createEvent('TextEvent');

      blockquote.initTextEvent('textInput', true, true, null, "\n" + "> blockquote");
      editor.dispatchEvent(blockquote);
      editor.selectionStart -= 10;
      editor.selectionEnd   -= 0;
    }

    var editor = $('#editor-content');
    liveUpdate(editor);
  },
  'click .e-link': function () {

  },
  'click ul.dropdown-link': function (event) {
    event.stopPropagation();
  }
});

Template.editorToolbar.onRendered( function () {

  $(window).on('resize', function () {
    if ($(window).width() <= 479) {
      Session.set('mobile', true);
    } else {
      Session.set('mobile', false);
    }
  });
});