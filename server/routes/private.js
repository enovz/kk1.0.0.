var collection 	= require('../controllers/api/collection'),
	video 		= require('../controllers/api/video');


module.exports = function(router, passport){

	router.use(function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}

		res.redirect('/#/');
	})


	// Get all collections
	router.get('/mycollections', collection.getAll); // return collections.ejs
	// Create a collection
	router.post('/mycollection', collection.create);
	// Get one product, update one product, delete one product
	router.route('/mycollection/:collectionId')
		.get(collection.read)
		.put(collection.update)
		.delete(collection.delete);

	// Get all videos
	router.get('/mycollection/:collectionId/videos', video.getAll);
	// Create a video
	router.post('/mycollection/:collectionId/video', video.create);
	// Get one video, update one video, delete one video
	router.route('/mycollection/:collectionId/video/:videoId')
		.get(video.read)
		.put(video.update)
		.delete(video.delete);

}