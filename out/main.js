"use strict";
exports.__esModule = true;
// import * as process from 'process';
var electron = require("electron");
var url = require("url");
var path = require("path");
var app = electron.app, BrowserWindow = electron.BrowserWindow, NativeImage = electron.NativeImage;
var mainWindow;
app.on('ready', function () {
    mainWindow = new BrowserWindow({
        title: 'NetworkManager Auto Connect',
        maximizable: false,
        resizable: false,
        icon: path.join(__dirname, '..', 'view', 'img', 'icon.png'),
        autoHideMenuBar: true,
        backgroundColor: '#ff00ff',
        darkTheme: true
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'view', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
});
