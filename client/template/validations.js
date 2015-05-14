validateUser = function (user) {
  var errors = {};

  //Check Length
    if(user.username.length < 6)
      errors.username =" Username > 6";

    if(user.password.length < 6)
      errors.password = " Password > 6";

  //Check if empty
    if(!user.username)
      errors.username =" Please enter username";

    if(!user.email)
      errors.email =" Please enter email";

    if(!user.password)
      errors.password = " Please enter password";

  //Check if Already Exists
    if(Meteor.users.findOne({username:user.username}))
      errors.username = " User already exists";

  //Check if Email
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(! filter.test(user.email))
      errors.email = " Enter a valid email";


  return errors;
}; //end Validate user