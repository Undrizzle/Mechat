var express = require('express');
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




//usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

/*
io.on('connection', function(socket){
    var addedUser = false;
    //when the client emits 'new mesage',this listens and executes
    socket.on('new message', function(data){
        //we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });
    //when the client emits 'add user',this listens and executes
    socket.on('add user', function(username){
        //we store the username in the socket session for this client
        socket.username = username;
        //add the client's username to the global list
        usernames[username] = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        //echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });
    //when the client emits 'typing',we broadcast it to others
    socket.on('typing', function() {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });
    //when the client emits 'stop typing',we broadcast it to others
    socket.on('stop typing', function() {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });
    //when the user disconnects.. perform this
    socket.on('disconnect', function() {
        //remove the username from global usernames list
        if(addedUser) {
            delete usernames[socket.username];
            --numUsers;
            //echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});
*/
module.exports = app;