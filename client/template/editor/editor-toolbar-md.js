bold = function() {
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
}

italic = function () {
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
}

codeblock = function () {
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
}

blockquote = function () {
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
}