// Server-only code. Publish the Notes collection securely and initialize the REST API.

function isAdmin(userId) {
  return userId === 'gaARNJiT9ofcNAFeP'; 
}

Meteor.startup(function () {

  Meteor.publish('notes', function () {
    return Notes.find(
      { },
      {
        sort: { timestamp: -1 }
      }
    )
  });

  // Server-side security
  Notes.allow({
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
      return userId && doc.userId === userId || isAdmin(userId);
    },
    remove: function (userId, doc) {
      // can only remove your own notes
      return userId && doc.userId === userId || isAdmin(userId);
    }
  });

  // Global API configuration
  var Api = new Restivus({
    prettyJson: true
  });

  // Generates: GET, POST on /api/notes and GET, PUT, DELETE on
  // /api/notes/:id for the Notes collection
  Api.addCollection(Notes);
});
