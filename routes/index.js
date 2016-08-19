var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var Account = require('../models/account');
var Message = require('../models/message');
var router = express.Router();

var jsonParser = bodyParser.json();

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.get('/leave', function(req, res) {
    res.render('leave', { user: req.user });
})

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

router.post('/login', passport.authenticate('local'), function(req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
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

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

router.post('/mechat/message', jsonParser, function(req, res) {
    var message = new Message(req.body);
    message.save(function (err, message) {
        if (err)
            res.send('1');
        else
            res.status(200).send('0');
    })

});

module.exports = router;