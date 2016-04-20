Posts = new Mongo.Collection('posts');

//profile image store
var profileImageStore = new FS.Store.GridFS("profileImages");

ProfileImages = new FS.Collection("profileImages",{
	stores: [profileImageStore]
});

//post store


//user data store
