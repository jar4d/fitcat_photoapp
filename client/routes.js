Router.configure({
	layoutTemplate:"navTemplate"
});

Router.route('/',{
	name: 'activity'
}); 

Router.route('/register',{
	name: 'register'
}); 

Router.route('/login',{
	name: 'login'
}); 
