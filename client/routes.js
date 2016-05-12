Router.configure({
	layoutTemplate:"navTemplate"
});

Router.route('/',{
	name: 'feed'
}); 

Router.route('/register',{
	name: 'register'
}); 

Router.route('/login',{
	name: 'login'
}); 
