Router.configure({
  layoutTemplate : 'layout',
});

Router.route('/', {
  name: 'list',
});

Router.route('/signin', {
  name: 'signin',
});

Router.route('/register', {
  name: 'register',
});

Router.route('/submit', {
  name: 'submit'
});

// FlowRouter.route('/', {
//   action: function (){
//     FlowLayout.render('layout', {main: 'list'});
//   }
// });

// FlowRouter.route('/signin', {
//   action: function () {
//     FlowLayout.render('layout', {main: 'signin'});
//   }
// });

// FlowRouter.route('/register', {
//   action: function () {
//     FlowLayout.render('layout', {main: 'register'});
//   }
// });
