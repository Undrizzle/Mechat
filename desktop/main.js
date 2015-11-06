var app = require('app');
var BrowserWindow = require('browser-window');
var path = require('path');

require('crash-reporter').start();

var mainWindow  = null;

app.on('window-all-closed', function() {
    if(process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 300,
        height: 600,
        min_width: 260,
        max_width: 550,
        min_height: 600,
        max_height: 900,
        frame: false
    });

    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    mainWindow.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});