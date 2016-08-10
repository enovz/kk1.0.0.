var	User 	= require('../models/user'),
	public 	= require('../controllers/api/public');

module.exports = function(router, passport){

	//TEST// => get collections, and get videos from collection by collectionID
	router.get('/collections', public.getAll);
	router.get('/collections/:collectionId', public.read); 

	//TEST//
	router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
	router.get('/google/callback', 
	  passport.authenticate('google', { successRedirect: '/#/my-collections', 
	                                      failureRedirect: '/#/' }));


	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})

	//router.get('/*', function(req, res){
	//	res.redirect('/#/');
	//})
};
