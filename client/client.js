Meteor.subscribe('posts');

var cameraOptions = {
  width: 600,
  height: 600
};

Template.feed.helpers({
  posts: function () {
    return Posts.find( {},{sort: { timestamp: -1 }} );
  }
});

Template.profile.helpers({
  profileDetails: function () {
  var user = Meteor.user();
  if (!user) return 'Anonymous';
  return user.profile && user.profile.name || user.username || user.emails[0].address || 'Anonymous';
  }

});


function userName() {
  var user = Meteor.user();
  if (!user) return 'Anonymous';
  return user.profile && user.profile.name || user.username || user.emails[0].address || 'Anonymous';
}

Template.feed.events({
  'click #take-photo': function () {
		MeteorCamera.getPicture(cameraOptions, function (error, data) {
		      if (error) {
		        // e.g. camera permission denied, or unsupported browser (Safari on iOS, looking at you)
		        console.log(error);
		      } else {
      				Session.set('photo', data);
      				Router.go('/takephotopage');
		      }
      	});
  }, 

});


Template.post.events({
  'click .delete': function (event, template) {
    // template.data holds the data context, i.e. the current Note object - http://docs.meteor.com/#/full/template_data
    Posts.remove(template.data._id, function (error) {
      if (error)
        sAlert.error(error.toString(), {effect: 'slide', position: 'top-right', timeout: 3000});
    });
  }
});

Template.takephotopage.helpers({
	photoPreview : function(){
	var photo = Session.get('photo');
	return photo;
	}

});

Template.takephotopage.events({
'submit form': function (event) {
		
        event.preventDefault();
		var photo = Session.get('photo');
        var photoCaption = event.target.photoCaption.value;   
        var photoTag = event.target.photoTag.value;     

        Posts.insert({
          photo: photo,
          photoCaption: photoCaption,
          photoTag: photoTag,

          timestamp: new Date(),
          position: Geolocation.latLng(),
          userId: Meteor.userId(),
          userName: userName()  // denormalize so we don't have to look up the user's name separately
        });

        Router.go('/');

      }
});




