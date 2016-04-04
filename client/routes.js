Router.configure({
	layoutTemplate:"navTemplate"
});

Router.route('/',{
	name: 'feed'
}); 

Router.route('/profile',{
	name: 'profile'
}); 

Router.route('/takephotopage',{
	name: 'takephotopage'
}); 
