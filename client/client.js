


Meteor.subscribe('notes');

var cameraOptions = {
  width: 600,
  height: 600
};

Template.body.helpers({
  // Provide the value for `notes` in {{#each notes}} in the HTML template.
  notes: function () {
    return Notes.find( {},{sort: { timestamp: -1 }} );
  }
});

// Return a friendly user name
function userName() {
  var user = Meteor.user();
  if (!user) return 'Anonymous';
  return user.profile && user.profile.name || user.username || user.emails[0].address || 'Anonymous';
}



// Define the event map - http://docs.meteor.com/#/full/eventmaps
Template.body.events({
  'click #take-photo': function () {
    MeteorCamera.getPicture(cameraOptions, function (error, data) {
      if (error) {
        // e.g. camera permission denied, or unsupported browser (Safari on iOS, looking at you)
        console.log(error);
      } else {
        // Insert a note in the client's collection; Meteor will persist it on the server.
        Notes.insert({
          photo: data,
          timestamp: new Date(),
          position: Geolocation.latLng(),
          userId: Meteor.userId(),
          userName: userName()  // denormalize so we don't have to look up the user's name separately
        });
      }
    });
  },

  'submit form': function (event, template) {
    var noteText = template.find('#message-input').value;
    if (noteText) {
      // Client-side collection operations are secured by allow/deny rules in ../server/notes.js.
      // Better yet, see https://www.discovermeteor.com/blog/meteor-methods-client-side-operations/
      Notes.insert({
        note: noteText,
        timestamp: new Date(),
        position: Geolocation.latLng(),
        userId: Meteor.userId(),
        userName: userName()
      });
      template.find('#message-input').value = '';  // clear the field after saving
    }
    return false;  // calls preventDefault() to not submit the form
  }
  
});


Template.note.events({
  'click .delete': function (event, template) {
    // template.data holds the data context, i.e. the current Note object - http://docs.meteor.com/#/full/template_data
    Notes.remove(template.data._id, function (error) {
      if (error)
        sAlert.error(error.toString(), {effect: 'slide', position: 'top-right', timeout: 3000});
    });
  }
});


