//dependencies
var mongoose = require('mongoose'),
    _        = require('lodash'),
   configDB  = require('../../config/database'),
   Grid      = require('gridfs-stream'),
   mime      = require('mime');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);


var video = {
  read: function(req, res, next){
    var videoId = mongoose.Types.ObjectId(req.params.videoId);
    gfs.files.find({ '_id': videoId }).toArray(function (err, files) {
      console.log('I have found this file: ' + files[0].filename);
      if(files.length===0){
      return res.status(400).send({
        message: 'File not found'
      });
      }
        var mimetype = mime.lookup(files[0].contentType);
        //mime type config  
        res.setHeader('Content-disposition', 'attachment; filename=' + files[0].filename);
        res.setHeader('Content-type', files[0].contentType);

      var readstream = gfs.createReadStream({
        _id: files[0]._id
      });
      readstream.pipe(res);
      
      readstream.on('end', function() {
          res.end();        
      });
 
    readstream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
    });
  });

  },
  create: function(req, res) {
    var part = req.files.file;
    var collectionId = mongoose.Types.ObjectId(req.params.collectionId);  
    var writeStream = gfs.createWriteStream({
      metadata: {fromCollection : collectionId},
      filename: part.name,
      mode: 'w',
      content_type:part.mimetype
    });

    writeStream.on('close', function() {
      return res.status(200).send('sucess');
    });
    writeStream.write(part.data);
    writeStream.end();
  },
  update: function(req, res, next){ 
    var videoId = mongoose.Types.ObjectId(req.params.videoId);
    console.log(req.body.filename);
    var newFileName = req.body.filename;
    gfs.files.updateOne({'_id' : videoId},{$set: {'filename': newFileName}}, function(err, file){
      if(err)throw err;
      res.json(file);
    })
  },
  delete: function(req, res, next){
    var videoId = mongoose.Types.ObjectId(req.params.videoId);
      gfs.files.deleteOne({'_id' : videoId}, function(err,file){
        if (err)throw err;
        res.json(file);          
    })
  },
  getAll: function(req, res, next){
    var collectionId = mongoose.Types.ObjectId(req.params.collectionId);
    gfs.files.find({'metadata.fromCollection' : collectionId}).toArray(function (err, files) {
      if (err)throw err;
      res.json(files);
      });
  } 
}

module.exports = video;


