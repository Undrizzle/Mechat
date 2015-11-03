var mongoose = require('mongoose');

//创建一个用户Model
var User = mongoose.model('User', {
    oauthID: Number,
    name: String,
    created: Date
});

module.exports = User;