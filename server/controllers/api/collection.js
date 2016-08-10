var Collection = require('../../models/collection');

var collection = {
  read: function(req, res, next){
    Collection.find({'_id': req.params.collectionId}, function(err, collection){
    if(err)throw err;
    res.json(collection);
     }) 
  },
  create: function(req, res, next){
    var newCollection = new Collection();
    newCollection.title = req.body.title; 
    newCollection.owner = req.user._id;
    newCollection.save(function(err, collection){
    if(err)throw err;
      else
        collection = newCollection;
        res.json(collection);
     }) 
  },
  update: function(req, res, next){
    Collection.update({ '_id': req.params.collectionId }, { $set: { title: req.body.title }}, function(err){
      if(err)throw err;
      res.status(200).send('success');
    });
  },
  delete: function(req, res, next){
    Collection.remove({'_id': req.params.collectionId}, function(err){
      if (err)throw err;
      else res.json(req.body);
    });
  },
  getAll: function(req, res, next){                     
    Collection.find({'owner' : req.user._id},function(err, collections){
     if(err) console.error;
       res.json(collections);
    });
  } 
}

module.exports = collection;