FlowRouter.route('/', {
  action: function (){
    FlowLayout.render('layout', { top: 'navbar', main: 'list'});
  }
});

FlowRouter.route('/signin', {
  action: function () {
    FlowLayout.render('layout', { top: 'navbar', main: 'signin'});
  }
});

FlowRouter.route('/register', {
  action: function () {
    FlowLayout.render('layout', { top: 'navbar', main: 'register'});
  }
});
