charCounter = function (limit, target, counter, limitHolder) {
  var limit_length = limit; //Declare limit length
  var msg_length = 0;       // Declare starting msg_length

  //String bytes() function creation
  String.prototype.bytes = function() {
    var msg = this; //msg is value of this.
    var cnt = 0;    //Declare starting cnt(count) to 0

    //Korean 2, if not 1 count increment
    for( var i=0; i< msg.length; i++) 
    cnt += (msg.charCodeAt(i) > 128 ) ? 1 : 1;  // 2 : 1
    return cnt;
  };

  var limitShow = limit;

  $(limitHolder).html('/ ' + limit + ' characters');

  $(target).keyup( function (event) {
    //msg_length = $.trim($(target).val()).bytes(); //to trim whitespaces
    msg_length = ($(target).val()).trim().bytes(); //to trim whitespaces



    if( msg_length <= limit_length ) {    
      $(counter).css("color", "#474646");   
      $(counter).html( msg_length ); 
    } else {
      $(counter).css("color", "#E55451");  
      $(counter).html( msg_length );  
    }
  });
};
