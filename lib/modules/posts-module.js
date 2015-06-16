PostsListController = RouteController.extend({
  template: 'list',
  increment: 10,
  postsLimit: function () {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function () {
    return {
      sort: this.sort,
      limit: this.postsLimit()
    }
  },
  subscriptions: function () {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  waitOn: function () {

  },
  posts: function () {
    return Posts.find({}, this.findOptions());
  },
  data: function () {
    var hasMore = this.posts().count() === this.postsLimit();
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    };
  },
});

NewPostsController = PostsListController.extend({
  sort: {createdAt: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

BestPostsController = PostsListController.extend({
  sort: {votes: -1, createdAt: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});


Router.route('/', {
  name: 'home',
  action: function () {
    this.redirect('/new');
  }
});

Router.route('/new', {
  name: 'newPosts',
  controller: NewPostsController
});

Router.route('/best', {
  name: 'bestPosts',
  controller: BestPostsController
});

