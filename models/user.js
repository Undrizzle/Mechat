var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    id: String,
    username: String,
    avatar: String,
    sex: String,
    region: String,
    signature: String,
    friends: [
      {id: String, username: String, avatar: String, sex: String, location: String, signature: String, remark: String}
    ]
});

module.exports = mongoose.model('User', User);
