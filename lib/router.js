FlowRouter.route('/', {
  action: function(){
    FlowLayout.render('layout', { top: 'navbar', main: 'list'});
  }
});
