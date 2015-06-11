

Template.draftModal.helpers({
  configureHammer: function () {
    return function (hammer, templateInstance) {
      var swipeleft = new Hammer.Swipe({
        event: 'swipe', /* prefix for custom swipe events, e.g. 2fingerswipeleft, 2fingerswiperight */
        pointers: 1,
        threshold: 10,
        velocity: 0.1
      });
      hammer.add(twoFingerSwipe);
      return hammer;
    }
  },
  templateGestures: {

    'swipeleft li.draft': function (event, templateInstance) {
      /* `event` is the Hammer.js event object */
      /* `templateInstance` is the `Blaze.TemplateInstance` */
      /* `this` is the data context of the element in your template, so in this case the iteree from someArray in the template */
      console.log('swiped left');
      if ($(event.target).is('li.draft')) {
        if (! $(event.target).hasClass('swiped-left')) {
          $(event.target).addClass('swiped-left');
        }
      }
      if ($(event.target).parent().is('li.draft')) {
        if (! $(event.target).parent().hasClass('swiped-left')) {
          $(event.target).parent().addClass('swiped-left');
        }
      }
    },
    'swiperight li.draft': function (event, templateInstance) {
      /* `event` is the Hammer.js event object */
      /* `templateInstance` is the `Blaze.TemplateInstance` */
      /* `this` is the data context of the element in your template, so in this case the iteree from someArray in the template */
      console.log('swiped right');
      if ($(event.target).is('li.draft')) {
        if ($(event.target).hasClass('swiped-left')) {
          $(event.target).removeClass('swiped-left');
        }
      }
      if ($(event.target).parent().is('li.draft')) {
        if ($(event.target).parent().hasClass('swiped-left')) {
          $(event.target).parent().removeClass('swiped-left');
        }
      }
    }
  },
  draft: function () {
    var userId = Meteor.userId();
    var draft = Drafts.find({'user._id': userId });

    if (userId && draft) {
      return draft;
    }
  },
  draftCount: function () {
    var userId = Meteor.userId();
    var draft = Drafts.find({'user._id': userId });

    if (userId && draft) {
      return draft.count();
    }
  },
  nextPath: function () {
    var draftCursor = Number(Session.get('draftsLimit'));
    return draftCursor === Drafts.find({'user._id': Meteor.user()._id}, {limit: draftCursor}).count();
  },
});

Template.draftModal.events({
  'click li.draft a': function () {
    var title = this.title;
    var content = this.content;

    $('#draftModal').modal('hide');

    // Empty Editor Values
    $('#editor-title').val('');
    $('#editor-content').val('');

    // Set Editor Values to Draft Values
    $('#editor-title').val(title);
    $('#editor-content').val(content);

    // Update Editor Preview
    Session.set('editor-content', content);
    Session.set('editor-title', title);

    // Set Current Draft Mode
    Session.set('currentDraft', this._id);

    // Dirty hack to update counter
    $('#editor-title').focus();
    $('#editor-content').focus();
  },
  'click .btn-delete': function () {
    if (this._id === Session.get('currentDraft')) {
      // Deleting when you are working on the draft to delete
      console.log('You are deleting your current post')

      // Remove Draft from DB
      Drafts.remove(this._id);

      // Revert Sessions to none-draft state
      Session.set('currentDraft', null);
      Session.set('autosaveState', null);

      // Hide Modal
      $('#draftModal').modal('hide');
    } else {

      Drafts.remove(this._id);
    }

  },
  'click a.load-more-draft': function (event) {
    event.preventDefault();

    Session.set('draftsLimit', Number(Session.get('draftsLimit')) + 5)
  }
});
