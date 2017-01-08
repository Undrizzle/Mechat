var express = require('express');
var cors = require('cors');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;

//连接数据库
mongoose.connect('mongodb://localhost/passport_example');

//跨域配置
app.use(cors());

var routes = require('./routes/index');
var users = require('./routes/users');

//app配置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//路由
app.use('/', routes);



/*
app.get('/sess', function(req, res, next) {
  res.json({msg: 'This is CROS-enabled for all origins!'});
}); */

//passport配置
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


http.listen(port, function(){
    console.log('Server listening at port %d', port);
});




//在线用户
var onlineUsers = {};
var users = {};
//当前在线人数
var onlineCount = 0;

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('private message', function(from, to, msg) {
      users[to].emit('to'+to, {mess: msg});
    });
});


module.exports = app;
