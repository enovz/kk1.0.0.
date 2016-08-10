var Collection 		= require('../../models/collection'),
	mongoose 		= require('mongoose'),
	configDB 		= require('../../config/database'),
	Grid 			= require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

var public = {
	read: function(req, res, next){
   	var collectionId = mongoose.Types.ObjectId(req.params.collectionId);
    gfs.files.find({'metadata.fromCollection' : collectionId}).toArray(function (err, files) {
      if (err)throw err;
      console.log(files);
      res.json(files);
      });
  	},
	getAll: function(req, res, next){                     
	    Collection.find({},function(err, collections){
	     if(err)throw err;     
	      res.json(collections);
	    });
	}
} 

module.exports = public;

