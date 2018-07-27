"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron = require("electron");
const url = require("url");
const path = require("path");
const process = require("process");
const mainMenuTemplate_1 = require("./components/mainMenuTemplate");
const ipcEvents_1 = require("./components/ipcEvents");
const { app, BrowserWindow, Menu } = electron;
let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: 'NetworkManager Auto Connect',
        maximizable: false,
        resizable: true,
        icon: path.join(__dirname, '..', 'view', 'img', 'icon.png'),
        autoHideMenuBar: process.env.NODE_ENV !== 'dev' ? true : false,
        backgroundColor: '#fff',
        darkTheme: true,
        titleBarStyle: 'hiddenInset',
        webPreferences: {
            devTools: process.env.NODE_ENV === 'dev' ? true : false
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'view', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate_1.mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on('closed', () => {
        app.quit();
    });
    if (process.env.NODE_ENV === 'dev') {
        mainWindow.webContents.openDevTools();
    }
});
ipcEvents_1.ipcEvents();
