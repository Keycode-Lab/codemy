Template.layout.events({
  'click .overlay-black': function (e) {
    if( $('#wrapper').hasClass('sidebar-right-set') ) {
      $('#wrapper').removeClass('sidebar-right-set');
    }
  }
});