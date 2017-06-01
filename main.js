const {
    app,
    BrowserWindow
} = require('electron');

const path = require('path');

const url = require('url');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600
    });

    // 加载页面
    win.loadURL(url.format({
        pathname: `${__dirname}/index.html`,
        protocol: 'file',
        slashes: true
    }));

    // 打开devTools
    win.webContents.openDevTools();

    // 关闭窗口
    win.on('close', () => {
        win = null;
    });
}



// 初始化创建窗口
app.on('ready', createWindow);

// 当所有窗口关闭时退出
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // macos系统当dock图标被点击并且没窗口打开时，通常重新创建一个窗口
    if (win === null) {
        createWindow();
    }
})