
Template.draftSaveModal.onRendered( function () {
  $('#draft-name').val($('#editor-title').val());
});

Template.draftSaveModal.events({
  'click .btn-save': function (e, t) {
    e.preventDefault();

    var titleName = $("#editor-title").val();
    var title = $.trim($('#editor-title').val());
    var content = $.trim($('#editor-content').val());

    // Prevent Save when both Title and Content is 0;
    if ((title.length === 0) && (content.length === 0)) {
      return false;
    }

    if (title.length === 0) {

      function getWords(str) {
        return str.split(/\s+/).slice(1,5).join(" ");
      };

      titleName = getWords($('#editor-content').val());
    }

    var post = {
      // name :    document.getElementById('draft-name').value,
      title:    titleName,
      content:  document.getElementById('editor-content').value
    }

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
