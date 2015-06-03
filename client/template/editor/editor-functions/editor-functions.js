liveUpdate = function (el){
  var update = el.val();
  Session.set('editor-content', '');
  Session.set('editor-content', update);
};

getSelected = function (el) {
  var u     = el.val();
  var start = el.get(0).selectionStart;
  var end   = el.get(0).selectionEnd;

  return [u.substring(0, start), u.substring(end), u.substring(start, end)];
};

getHighlight = function (el) {
  var u     = el.val();
  var start = el.get(0).selectionStart;
  var end   = el.get(0).selectionEnd;

  return [u.substring(start, end)];
};

getSelectionText = function () {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
};

replaceSelectedText = function (el, text) {
    var sel = getInputSelection(el);
    var val = el.val();
    el.value = val.slice(0, sel.start) + text + val.slice(sel.end);
}

// http://stackoverflow.com/questions/3964710/replacing-selected-text-in-the-textarea

// editor = {

//   version: '0.0.1',

//   config: {

//   },

//   events: {
//     bold: function (event) {
//       // var self = this; // This returns the editor
//       var button = event.target;

//       if(button.className.match(/\bbold\b/)) {

//       }

//   },

//   init: function (el) {
//     var self   = this; // Returns this 'editor' Object

//     console.log('I am initiated');
//     el.addEventListener('click', self.events.bold);
//   },

// }