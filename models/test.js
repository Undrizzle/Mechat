var mongoose = require('mongoose');
var User = require('../models/user');

mongoose.connect('mongodb://localhost/passport_example');

var newFriend = {
  id: 'flower',
  username: '小Q',
  avatar: '//localhost:3000/img/user/yu.jpg',
  sex: 'male',
  region: '',
  signature: '',
  remark: ''
}

User.findOne({id: 'undrizzle'}, function (err, user) {
  if (err)
    return handleError(err);
  else {
    console.log(user);
    user.friends.push(newFriend);
    user.markModified('friends');
    user.save(function(err){

    })
  }
})
