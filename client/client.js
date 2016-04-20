Meteor.subscribe('posts');

<<<<<<< HEAD
var cameraOptions = {
  width: 600,
  height: 600
};

Session.set('photo',false);

=======
>>>>>>> origin/photosplustext

Template.navTemplate.onRendered(function () {
  $('.sideMenuButton').sideNav({ 
    closeOnClick: true
  });
});

Template.navTemplate.helpers({
  username: function(){
    var user = Meteor.user();
    return user.emails[0].address; //change this...
  }
});

Template.register.helpers({
  profileImage: function(){
    var image = Session.get('photo');
    if(image == false){
      return "/img/1.jpeg"; //a holding image
    }else{
      return image;
    }
  }
});


Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var profileImageVar = Session.get('photo');
        var usernameVar = event.target.username.value; 
        var catNameVar = event.target.catName.value;       
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        var passwordVar2 = event.target.passwordAgain.value;
        if(passwordVar == passwordVar2){

          console.log("Form submitted.");

      Accounts.createUser({
        profileImage: profileImageVar,
        username: usernameVar,
        catName: catNameVar,
        email: emailVar,
        password: passwordVar
      });
      Router.go('/');

      return Session.get('isAdmin');
        }else{
          console.log("Passwords don't match. Try again");

        }

    },

  'click #take-photo': function () {
    MeteorCamera.getPicture(cameraOptions, function (error, data) {
          if (error) {
            // e.g. camera permission denied, or unsupported browser (Safari on iOS, looking at you)
            console.log(error);
          } else {
              Session.set('photo', data);

          }
        });
  }


});

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        console.log("Form submitted.");
        Meteor.loginWithPassword(emailVar, passwordVar, function (err){
    if(err){
      console.log(err);
      alert(err.reason);
      Session.set("loginError", true);
     }else{
      Router.go('/');
      Session.set('userEmail',emailVar);
  //checks if user is admin
      if(ADMIN_USERS.indexOf(emailVar) !== -1){ //Meteor.user().emails[0].address
          Session.set('isAdmin',true);
          console.log("isAdmin");
          return Session.get('isAdmin');

      }else{
          Session.set('isAdmin',false);
          console.log("isntAdmin");
          return Session.get('isAdmin');
      } 
    }
     });
    }
});


<<<<<<< HEAD
Template.feed.helpers({
  posts: function () {
    return Posts.find( {},{sort: { timestamp: -1 }} );
  },
  profileImage: function(){
    var user = Meteor.user();
    return user.profileImage;
  }
});

Template.profile.helpers({

  profileDetails: function () {
  var user = Meteor.user();
  if (!user) return 'Anonymous';
  return user.profile && user.profile.name || user.username || user.emails[0].address || 'Anonymous';
  },
  username: function(){
    var user = Meteor.user();
    return user.emails[0].address; //change this...
  },

  postCount: function(){
    var thisUserId = Meteor.userId();
    return Posts.find( {userId:thisUserId} ).count();
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


Template.takephotopage.onRendered(function () {
    $('input#input_text, textarea#photoCaption').characterCounter();
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




=======
>>>>>>> origin/photosplustext
