Template.editor.events({
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
  //Autosize of Content Text Area (this is a plugin)
  $('#editor-content').autosize();
})

