Template.postPage.onCreated( function () {

  Session.set('commentLimit', 4);

  if (Meteor.user()) {
    var postId = Router.current().params._id;
    Meteor.call('viewCount', postId, function(error, result) {
      if (error) {
        console.log(error.reason);
      } else {
        console.log('viewed page. incremented');
      }
    });
  }
});

Template.postPage.helpers({
  comments: function() {
    var commentCursor = parseInt(Session.get('commentLimit'));
    return Comments.find({postId: this._id}, {limit: commentCursor});
  },
  cpointsAuthor: function () {
    var author = this.user;

    if (author && author._id) {
      var authorById = Meteor.users.findOne({_id: author._id});

      return authorById.profile.cpoints;
    }
  },

});


Template.postPage.events({
  'click a.btn-zoom': function (event) {
    event.preventDefault;
    var zoomFont = parseInt($(event.target).closest('code').css('font-size')) + 2;
    if(zoomFont <= 25) {
      $(event.target).closest('code').css('font-size', zoomFont);
    }
  },
  'click a.btn-zoomOut':function(event){
    event.preventDefault;
    var zoomOutFont = parseInt($(event.target).closest('code').css('font-size')) + -2;
    if(zoomOutFont >= 10) {
      $(event.target).closest('code').css('font-size', zoomOutFont);
    }
  },
  'click a.add-comment': function (event, template) {
    template.$('.post-footer').show();
    $(event.target).hide();
  },
  'click a.load-more-comments': function (event) {
    event.preventDefault();

    Session.set('commentLimit', Number(Session.get('commentLimit')) + 4)
  }
});



Template.postPage.onRendered( function () {
  $('.post-footer').hide();

  $('[data-toggle="tooltip"]').tooltip();

  this.autorun( function () {
    $('pre code').prepend('<a class="btn btn-xs btn-zoom" tabindex="-1"><i class="plus icon"></i></a>');
    $('pre code').prepend('<a class="btn btn-xs btn-zoomOut" tabindex="-1"><i class="minus icon"></i></a>');
  });

  $('pre code').parent().hover(
    // On Hover (mouseenter)
    function (event) {
      // $('a.btn-zoom', event.target).fadeIn('300');
      // $('a.btn-zoomOut', event.target).fadeIn('300');
      $('a.btn-zoom', event.target).css('display', 'inline-block');
      $('a.btn-zoom', event.target).css('opacity', '1');
      $('a.btn-zoomOut', event.target).css('display', 'inline-block');
      $('a.btn-zoomOut', event.target).css('opacity', '1');
    },
    // On Hover Out (mouseleave)
    function (event) {
      // $('a.btn-zoom', event.target).fadeOut('300');
      // $('a.btn-zoomOut', event.target).fadeOut('300');
      $('a.btn-zoom', event.target).css('display', 'none');
      $('a.btn-zoom', event.target).css('opacity', '0');
      $('a.btn-zoomOut', event.target).css('display', 'none');
      $('a.btn-zoomOut', event.target).css('opacity', '0');
  });
});
