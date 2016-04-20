// Server-only code. Publish the Notes collection securely and initialize the REST API.

function isAdmin(userId) {
  return userId === 'gaARNJiT9ofcNAFeP'; 
}

Meteor.startup(function () {

  Meteor.publish('posts', function () {
    return Posts.find(
      { },
      {
        sort: { timestamp: -1 }
      }
    )
  });

  // Server-side security
  Posts.allow({
    // allows only those signed in to post, but everyone to view.
    insert: function (userId, doc) {
      if(userId && doc.userId === userId){
        return true;        
      }
      else if(isAdmin(userId)){
        return true;
      }
      else{
        return false;
      }

    },
    update: function (userId, doc, fields, modifier) {

      if(userId && doc.userId === userId){
        return true;        
      }
      else if(isAdmin(userId)){
        return true;
      }
      else{
        return false;
      }

    },
    remove: function (userId, doc) {
      // can only remove your own notes
      if(userId && doc.userId === userId){
        return true;        
      }
      else if(isAdmin(userId)){
        return true;
      }
      else{
        return false;
      }
    }
    
  });

ProfileImages.deny({
     insert: function(){
        return false;
     },
     update: function(){
        return false;
     },
     remove: function(){
        return false;
     },
     download: function(){
        return false;
     }
 });

ProfileImages.allow({
    insert: function (userId, doc) {
      if(userId && doc.userId === userId){
        return true;        
      }
      else if(isAdmin(userId)){
        return true;
      }
      else{
        return false;
      }

    },
    update: function (userId, doc) {
      if(userId && doc.userId === userId){
        return true;        
      }
      else if(isAdmin(userId)){
        return true;
      }
      else{
        return false;
      }

    },

 remove: function (userId, doc) {
      if(userId && doc.userId === userId){
        return true;        
      }
      else if(isAdmin(userId)){
        return true;
      }
      else{
        return false;
      }

    },
 download: function(){
    return false;
 }
});





  // Global API configuration
  var Api = new Restivus({
    prettyJson: true
  });

  // Generates: GET, POST on /api/notes and GET, PUT, DELETE on
  // /api/notes/:id for the Notes collection
  Api.addCollection(Posts);
});
