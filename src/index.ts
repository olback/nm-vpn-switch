// import * as process from 'process';
import * as electron from 'electron';
import * as url from 'url';
import * as path from 'path';

const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        title: 'NetworkManager Auto Connect',
        maximizable: false,
        resizable: false,
        icon: path.join(__dirname, '..', 'view', 'img', 'icon.png'),
        autoHideMenuBar: true,
        backgroundColor: '#ff00ff'
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'view', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

});
