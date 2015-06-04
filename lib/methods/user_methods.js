Meteor.methods({
  updateInfo: function(userId,newInfo){
    Meteor.users.update( userId , { $set: { 'profile.info': newInfo }} );
  },
  updateLastPost:function(userId){
    Meteor.users.update(userId, {$set:{"profile.lastPost":new Date()}});
  },
  updateLastAnswer:function(userId){
    Meteor.users.update(userId, {$set:{"profile.lastAnswer":new Date()}});
  },

  BestAnswer : function(userId){
    Meteor.users.update(
            userId,
            {$inc : { 'profile.cpoints' : 15 }}
          );
  },
  cancelBestAnswer : function(userId){
    Meteor.users.update(
            userId,
            {$inc : { 'profile.cpoints' : -15 }}
          );
  },
  upvoteUser : function(userId){
    Meteor.users.update(
            userId,
            {$inc : { 'profile.cpoints' : 3 }}
          );
  },
  unvoteUser : function(userId){
    Meteor.users.update(
            userId,
            {$inc : { 'profile.cpoints' : -3 }}
          );
  }
});


