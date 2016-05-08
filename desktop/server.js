var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'app')));

app.get('/',function (req, res) {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.listen(3000, 'localhost', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:3000');
});