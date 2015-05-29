Template.editorToolbar.onCreated( function () {
  // Turn Autosave off
  Session.set('autosaveState', false);
});

Template.editorToolbar.onDestroyed( function () {
  // Turn Autosave off
  Session.set('autosaveState', false);
});

Template.editorToolbar.helpers({
  previewState: function () {
    if ( Session.get('previewState') === true ) {
      return 'on';
    } else {
      return 'off';
    }
  },
  previewStateColor: function () {
    if ( Session.get('previewState') === true ) {
      return 'badge-green';
    } else {
      return 'badge-red';
    }
  },
  loadedDraft: function () {
    return Session.get('currentDraft');
  },
  autosaveState: function () {
    if ( Session.get('autosaveState') === true ) {
      return 'on';
    } else {
      return 'off';
    }
  },
  autosaveStateColor: function () {
    if ( Session.get('autosaveState') === true ) {
      return 'badge-green';
    } else {
      return 'badge-red';
    }
  },
});

Template.editorToolbar.events({
  'click .btn-preview': function (e) {
    var $editorWrapper = $('.editor-wrapper');
    if ( $editorWrapper.hasClass('show-preview') ) {
      $editorWrapper.removeClass('show-preview');
      Session.set('previewState', false);
    } else {
      $editorWrapper.addClass('show-preview');
      Session.set('previewState', true);
    }
  },
  'click .btn-new': function () {
    $('#editor-title').val('');
    $('#editor-content').val('');

    // Dirty hack to update counter
    $('#editor-title').focus();
    $('#editor-content').focus();

    Session.set('currentDraft', null);
    window.clearInterval(Autosave);
  },
  'click .btn-autosave': function () {
    if (Session.get('autosaveState') === false) {
      Session.set('autosaveState', true);
    } else {
      Session.set('autosaveState', false);
    }
  },
  'click .btn-markdown': function () {
    $('#wrapper').toggleClass('sidebar-right-markdown');
  },
  'click .e-bold': function () {
    var editor = $('#editor-content');
    var select = getSelected(editor);

    editor.focus();

    if (getSelectionText().length >= 1) {
      var editor = document.getElementById ("editor-content");
      var bold = document.createEvent('TextEvent');
      bold.initTextEvent('textInput', true, true, null, "**"+select[2]+"**");
      editor.dispatchEvent(bold);
    } else {
      var editor = document.getElementById ("editor-content");
      var bold = document.createEvent('TextEvent');
      bold.initTextEvent('textInput', true, true, null, "**"+"boldtext"+"**");
      editor.dispatchEvent(bold);
      editor.selectionStart -= 10;
      editor.selectionEnd   -= 2;
    }

    var editor = $('#editor-content');
    liveUpdate(editor);
  },
  'click .e-italic': function () {
    // Declare Editor Variables
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
    // Declare Editor Variables
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

  }
});

Template.editorToolbar.onRendered( function () {
  // Session
  Session.set('previewState', true);

  $(window).on('resize', function () {
    if ($(window).width() <= 479) {
      Session.set('mobile', true);
    } else {
      Session.set('mobile', false);
    }
  });
});