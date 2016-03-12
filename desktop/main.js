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
        width: 950,
        height: 800,
        min_width: 950,
        min_height: 800,
        frame: false
    });

    mainWindow.loadUrl('file://' + __dirname + '/main.html');

    mainWindow.openDevTools();

    //关闭聊天窗口
    /*
    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    ipc.on('close:mess', function(event, arg) {
        mainWindow.close();
        mainWindow = null;
    }); */
});