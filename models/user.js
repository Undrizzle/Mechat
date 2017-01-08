var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var User = new Schema({
    id: String,
    username: String,
    avatar: String,
    sex: String,
    region: String,
    signature: String,
    email: String,
    hashedPassword: String,
    salt: String,
    friends: [
      {id: String, username: String, avatar: String, sex: String, region: String, signature: String, remark: String}
    ]
});

//虚拟属性
User.virtual('password')
  .set(function(password) {
    console.log('2');
    this._password = password;
    this.salt = crypto.randomBytes(16).toString('base64');
    var salt = new Buffer(this.salt, 'base64');
    this.hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  })
  .get(function() {
    return this._password;
  });

User.path('email').validate(function(value, respond) {
  console.log('3');
  var self = this;
  this.constructor.findOne({email: value}, function(err, user) {
    if(err) throw err;
    if(user) {
      console.log("the email is exists");
      return respond(false);
    }
    respond(true);
  });
}, '邮箱已经被使用');

User.path('id').validate(function(value, respond) {
  mongoose.models["User"].findOne({id: value}, function(err, user) {
    console.log('1');
    if (err) throw err;
    if (user) return respond(false);
    response(true);
  });
}, '用户名已经存在');

module.exports = mongoose.model('User', User);
