Template.list.helpers({
  posts: function () {
    return Posts.find();
  }
});

Template.list.events({
  'click a.btn-ask': function () {

  }
});