FlowRouter.route('/', {
  action: function (){
    FlowLayout.render('layout', {main: 'list'});
  }
});

FlowRouter.route('/signin', {
  action: function () {
    FlowLayout.render('layout', {main: 'signin'});
  }
});

FlowRouter.route('/register', {
  action: function () {
    FlowLayout.render('layout', {main: 'register'});
  }
});
