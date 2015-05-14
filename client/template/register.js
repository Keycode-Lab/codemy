Template.register.helpers({

});

Template.register.events({
  'submit #registerForm' : function (e, t) {
    e.preventDefault();

    // Set Random avatar
    // Create an array of your sites, then pick one element from the array. You do this by choosing a random number using Math.random(), which gives you a result greater than or equal to 0 and less than 1. Multiply by the length of your array, and take the floor (that is, take just the integer part, dropping off any decimal points), so you will have a number from 0 to one less than the length of your array (which will thus be a valid index into your array). Use that result to pick an element from your array.
    var avatars = ['/img/avatar.png'];
    var resultAvatar = avatars[Math.floor(Math.random() * avatars.length)];



    // Set var user to hold values from form to register
    var user = {
      username: $.trim(t.find('#register-username').value.toLowerCase()),
      email: $.trim(t.find('#register-email').value.toLowerCase()),
      password: t.find('#register-password').value,
      profile: {
        info: 'Hi! Here, you can briefly introduce yourself in any way you want.',
        username: t.find('#register-username').value,
        avatar: resultAvatar,
        cpoints: 0,
        lastPost: 0,
        lastAnswer: 0
      }
    };

    // Error snippet for inline errors
    //var errors = validateUser(user);

    //if (errors.username || errors.email || errors.password)
    //  return Session.set('registerErrors', errors);

    // Add User After Successful Validation!!
    Accounts.createUser(user, function(error) {
      if(error) {
        if (error.message === 'Email already exists. [403]') {
                //  Session.set('registerSuccess', {email:''});
                //  Session.set('registerErrors', {email:' Email already exists'});
                //  console.log('We are sorry but this email is already used.');
              } else {
          //throwError('Error',error.reason);
          console.log('We are but something went wrong.');
        }
      } else {
        var currentUser = Meteor.user().profile.username || Meteor.user().profile.name ;
        //throwSuccess('Registration Successful','Welcome ' + currentUser + '!');
        FlowRouter.go('/'); //Redirect User to homepage
      }
    });
    return false;

  }
});

Template.register.onRendered( function () {

});