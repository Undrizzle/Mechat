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
        width: 700,
        height: 510,
        min_width: 700,
        max_width: 700,
        min_height: 510,
        max_height: 5100,
        frame: false
    });

    mainWindow.loadUrl('file://' + __dirname + '/message.html');

    mainWindow.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});