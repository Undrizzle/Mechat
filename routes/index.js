var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var Account = require('../models/account');
var Message = require('../models/message');
var Suggest = require('../models/suggest');
var User = require('../models/user');
var nodemailer = require('nodemailer');
var router = express.Router();

var jsonParser = bodyParser.json();

var transporter = nodemailer.createTransport('smtps://357419894%40qq.com:xxxxxx@smtp.qq.com');

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.get('/leave', function(req, res) {
    res.render('leave', { user: req.user });
});

router.post('/register', function(req, res, next) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});


router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.post('/sess', jsonParser, function(req, res) {
  console.log('req.body');
  res.status(200).send('ok');
})

router.post('/contact', jsonParser, function(req, res) {
  var id = req.body.id;   //id = undrizzle
  User.findOne({'id': id}, function (err, user) {
    if (err)
      res.send('err contact');
    else {
      res.status(200).send(user.friends)
    }
  })
})

router.post('/suggest', jsonParser, function(req, res) {
  console.log(req.body);
  var suggests = new Suggest;
  suggests.username = req.body.username;
  suggests.advise = req.body.advise;
  suggests.submit = new Date;
  suggests.save(function (err, message) {
    if (err)
      res.send('1');
    else {
      res.status(200).send('0');
    }
  })
})

router.post('/mechat/message', jsonParser, function(req, res) {
    var message = new Message(req.body);
    var mailOptions = {
        from: '"undrizzle"357419894@qq.com',
        to: 'Burning@prevail-catv.com',
        subject: '留言',
        text: 'Hello World',
        html: req.body.phone + '<br>' + req.body.email + '<br>' + req.body.message
    };
    message.save(function (err, message) {
        if (err)
            res.send('1');
        else {
            res.status(200).send('0');
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            })
        }

    })

});

module.exports = router;
