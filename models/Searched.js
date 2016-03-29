var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * ip is not implemented yet.
 */
var searchedSchema = new Schema({
    term: String,
    ip: {type: String, default: '0.0.0.0'},
    date: {type: Date, default: Date.now}
});

var Searched = mongoose.model('Searched', searchedSchema);

module.exports = Searched;