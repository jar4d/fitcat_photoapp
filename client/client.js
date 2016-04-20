Meteor.subscribe('posts');


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
})


Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var usernameVar = event.target.username.value;        
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;
        var passwordVar2 = event.target.passwordAgain.value;
        if(passwordVar == passwordVar2){

          console.log("Form submitted.");

      Accounts.createUser({
        username: usernameVar,
        email: emailVar,
        password: passwordVar
      });

      return Session.get('isAdmin');
        }else{
          console.log("Passwords don't match. Try again");

        }

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


