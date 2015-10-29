var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow  = null;

app.on('window-all-closed', function() {
    if(process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 1050,
        height: 595,
        transparent: false
    });

    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    mainWindow.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});