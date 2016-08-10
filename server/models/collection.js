var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	owner: String,
	title: String
});

var Collection = mongoose.model("Collections", schema);

module.exports = Collection;