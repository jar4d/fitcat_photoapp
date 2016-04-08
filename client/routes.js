Router.configure({
	layoutTemplate:"navTemplate"
});

Router.route('/',{
	name: 'feed'
}); 

Router.route('/profile',{
	name: 'profile'
}); 

Router.route('/register',{
	name: 'register'
}); 

Router.route('/login',{
	name: 'login'
}); 

Router.route('/takephotopage',{
	name: 'takephotopage'
}); 
