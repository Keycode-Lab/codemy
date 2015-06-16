Template.postPage.onCreated( function () {
  // Set Default 'commentLimit' to 5
  Session.set('commentLimit', 5);

  // Set Default 'answerLimit' to 5
  Session.set('answerLimit', 5);

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

Template.postPage.onDestroyed( function () {
  delete Session.keys['commentLimit'];
});

Template.postPage.helpers({
  /**
   * [comments description]
   * Returns comments based on postId and 'commentCursor' Session.
   */
  comments: function () {
    var commentCursor = Number(Session.get('commentLimit'));
    return Comments.find({postId: this._id}, {limit: commentCursor});
  },

  answers: function () {
    var answerCursor = Number(Session.get('answerLimit'));
    return Answers.find({postId: this._id}, {limit: answerCursor});
  },
  // noComments: function () {
  //   var commentCount = Comments.find({postId: this._id}, {limit: commentCout}).count();
  //   return commentCount === 0;
  // },
  nextPath: function () {
    var commentCursor = Number(Session.get('commentLimit'));
    return commentCursor === Comments.find({postId: this._id}, {limit: commentCursor}).count();
  },
  cpointsAuthor: function () {
    var author = this.user;

    if (author && author._id) {
      var authorById = Meteor.users.findOne({_id: author._id});
      if (authorById && authorById.profile) {
        return authorById.profile.cpoints;
      }
    }
  },
  ownPost: function () {
    var post = Posts.findOne({_id: this._id});

    if (post && post.user && post.user._id) {
      return Meteor.userId() === post.user._id;
    }
  }

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
    $(event.target).parent().siblings('.comment-wrapper').show();
    $(event.target).hide();
  },
  'click a.load-more-comments': function (event) {
    event.preventDefault();
    Session.set('commentLimit', Number(Session.get('commentLimit')) + 5)
  },
  'click .btn-confirm-delete': function (event) {
    // Call Method to delete here
    var id = '#post-'+this._id;
    console.log(this._id)
    console.log(this.user._id)

    if ($(event.target).parent().is(id)) {
      Meteor.call('postRemove', this.user._id, this._id, function (error, result) {
        if (error) {
          console.log(error);
          throwError(error.reason);
        } else {
          throwSuccess('질문이 성공적으로 삭제됐습니다.')
          Router.go('/new');
        }
      });
    }

  },
  'click .btn-confirm-cancel': function () {
    $('.delete-confirm').slideToggle(300);
  }
});



Template.postPage.onRendered( function () {
  $('.comment-wrapper').hide();

  $('[data-toggle="tooltip"]').tooltip();

  this.autorun( function () {
    $('pre code').prepend('<a class="btn btn-xs btn-zoom" tabindex="-1"><i class="plus icon"></i></a>')
                 .prepend('<a class="btn btn-xs btn-zoomOut" tabindex="-1"><i class="minus icon"></i></a>');
  });

  $('pre code').parent().hover(
    // On Hover (mouseenter)
    function (event) {
      $('a.btn-zoom', event.target).css('display', 'inline-block')
                                   .css('opacity', '1');
      $('a.btn-zoomOut', event.target).css('display', 'inline-block')
                                      .css('opacity', '1');
    },
    // On Hover Out (mouseleave)
    function (event) {
      $('a.btn-zoom', event.target).css('display', 'none')
                                   .css('opacity', '0');
      $('a.btn-zoomOut', event.target).css('display', 'none')
                                      .css('opacity', '0');
  });
});
