var mongoose = require('mongoose');
var User = require('../models/user');

mongoose.connect('mongodb://localhost/passport_example');

var user = new User;
user.id = 'undrizzle';
user.username = '不觉细雨';
user.avatar = '//localhost:3000/img/user/bu.jpg';
user.sex = 'male';
user.location = '浙江 杭州';
user.signature = '母的鸡遇到公的鸡恰恰好生小鸡';
var love1 = {
  id: 'NianNinne',
  username: 'NianNinne',
  avatar: '//localhost:3000/img/user/xi.jpg',
  sex: 'female',
  region: '浙江 杭州',
  signature: '我只信仰一个会跳舞的上帝',
  remark: '方圆'
};
var love2 = {
  id: 'zhilu310',
  username: '蛋蛋',
  avatar: '//localhost:3000/img/user/jue.jpg',
  sex: 'female',
  region: '浙江 杭州',
  signature: '? ! ... 。',
  remark: '单丹蕾'
};
user.friends.push(love1, love2);
user.save(function (err, message) {
  if (err)
    console.log('error')
  else {
    console.log('success')
  }
})
