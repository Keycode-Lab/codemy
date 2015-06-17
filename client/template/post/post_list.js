var triggerHandle;

Template.list.onRendered( function () {
  triggerHandle = InfiniteScrollTrigger.bind( function () {
    if (Router.current().nextPath())
      Router.go(Router.current().nextPath());
  });
});

Template.list.onDestroyed( function () {
  if (triggerHandle)
    InfiniteScrollTrigger.unbind(triggerHandle);
});

Template.list.helpers({
  // posts: function () {
  //   return Posts.find();
  // }
});

Template.list.events({
  'click a.btn-ask': function () {

  }
});