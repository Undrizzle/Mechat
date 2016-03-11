const ipcRender = require('electron').ipcRender;

$('#close').click(function() {
    ipcRender.sendSync('close:mess');
});