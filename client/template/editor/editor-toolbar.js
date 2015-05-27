Template.editorToolbar.helpers({
  previewState: function () {
    if ( Session.get('previewState') === true ) {
      return 'off';
    } else {
      return 'on';
    }
  },
  previewStateColor: function () {
    if ( Session.get('previewState') === true ) {
      return 'badge-red';
    } else {
      return 'badge-green';
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
  'click .btn-markdown': function () {
    $('#wrapper').toggleClass('sidebar-right-markdown');
  },
  'click .e-bold': function () {
    // Declare Editor Variables
    var editor = $('#editor-content');
    var select = getSelected(editor);

    editor.focus();

    if (getSelectionText().length >= 1) {
      editor.val(select[0] + '**'+ select[2] + '**' + select[1]);
    } else {
      var start = editor.get(0).selectionStart;
      var end = editor.get(0).selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      editor.val(editor.val().substring(0, start)
                + "****"
                + editor.val().substring(end));

      // put caret at right position again
      editor.get(0).selectionStart =
      editor.get(0).selectionEnd = start + 2;
    }
    liveUpdate(editor);
  },
  'click .e-italic': function () {
    // Declare Editor Variables
    var editor = $('#editor-content');
    var select = getSelected(editor);

    editor.focus();

    if (getSelectionText().length >= 1) {
      editor.val(select[0] + '*'+ select[2] + '*' + select[1]);
    } else {
      var start = editor.get(0).selectionStart;
      var end = editor.get(0).selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      editor.val(editor.val().substring(0, start)
                + "**"
                + editor.val().substring(end));

      // put caret at right position again
      editor.get(0).selectionStart =
      editor.get(0).selectionEnd = start + 1;
    }
    liveUpdate(editor);
  },
  'click .e-code': function () {
    // Declare Editor Variables
    var editor = $('#editor-content');
    var select = getSelected(editor);

    editor.focus();

    if (getSelectionText().length >= 1) {
      editor.val(select[0] + '```'+ '\n' + select[2] + '\n' + '```' + select[1]);
    } else {
      var start = editor.get(0).selectionStart;
      var end = editor.get(0).selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      editor.val(editor.val().substring(0, start)
                + "``````"
                + editor.val().substring(end));

      // put caret at right position again
      editor.get(0).selectionStart =
      editor.get(0).selectionEnd = start + 3;
    }
    liveUpdate(editor);
  },
  'click .e-blockquote': function () {
    var editor = $('#editor-content');
    var select = getSelected(editor);

    editor.focus();

    var selected = getHighlight(editor);

    var newVal = selected.toString(); // .split(",").join("\n");

    var eachLines = newVal.split('\n');
    var newLines = [];

    for ( i = 0; i < eachLines.length; i++) {
      eachLines[i] = '> ' + eachLines[i];
      newLines.push(eachLines[i]);
    }

    newLines = newLines.toString();
    newLines = newLines.split(",").join("\n");

    // Add Replace text in textarea
    editor.val(select[0] + newLines + select[1]);

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