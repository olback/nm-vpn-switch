import * as electron from 'electron';
import * as url from 'url';
import * as path from 'path';
import * as process from 'process';
import { mainMenuTemplate } from './components/mainMenuTemplate';
import { ipcEvents } from './components/ipcEvents';
const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', () => {

    // Create main window
    mainWindow = new BrowserWindow({
        title: 'NetworkManager Auto Connect',
        maximizable: false,
        resizable: true, // false
        icon: path.join(__dirname, '..', 'view', 'img', 'icon.png'),
        autoHideMenuBar: process.env.NODE_ENV !== 'dev' ? true : false,
        backgroundColor: '#fff',
        darkTheme: true,
        titleBarStyle: 'hiddenInset',
        webPreferences: {
            devTools: process.env.NODE_ENV === 'dev' ? true : false
        }
    });

    // Load file into main window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'view', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', () => {
        app.quit();
    });

    if (process.env.NODE_ENV === 'dev') {
        mainWindow.webContents.openDevTools();
    }

});

ipcEvents();
