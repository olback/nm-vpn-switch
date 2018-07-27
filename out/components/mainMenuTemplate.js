"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process = require("process");
const electron = require("electron");
const { app } = electron;
function accelerator(keys) {
    let accel = keys.join('+');
    if (process.platform === 'darwin') {
        accel = accel.replace('Ctrl', 'Command');
    }
    else {
        accel = accel.replace('Command', 'Ctrl');
    }
    return accel;
}
exports.mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: accelerator(['Ctrl', 'Q']),
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'About'
            },
            {
                label: 'Contribute'
            },
            {
                label: 'Help'
            }
        ]
    }
];
if (process.platform === 'darwin') {
    exports.mainMenuTemplate.unshift({});
}
if (process.env.NODE_ENV === 'dev') {
    exports.mainMenuTemplate.push({
        label: 'Dev tools',
        submenu: [
            {
                label: 'Toggle dev tools',
                accelerator: accelerator(['Ctrl', 'Shift', 'I']),
                click(_, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload',
                accelerator: accelerator(['Ctrl', 'Shift', 'R'])
            }
        ]
    });
}
