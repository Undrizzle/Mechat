var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Suggest = new Schema({
    username: String,
    advise: String,
    submit: Date
});

module.exports = mongoose.model('Suggest', Suggest);
