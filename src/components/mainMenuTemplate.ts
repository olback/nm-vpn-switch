/*
 * @Author: olback
 * @Date: 2018-07-29 18:42:42
 * @Last Modified by: olback
 * @Last Modified time: 2018-07-31 17:00:54
 */

import * as process from 'process';
import * as electron from 'electron';
import * as about from './aboutWindow';
import * as manageAutostart from './mangeAutostart';
import * as nmcli from './nmcliInterface';
import { mainWindow } from '../index';
import * as opn from 'opn';

const { app } = electron;

/**
 * Returns the correct OS-specific accelerator string. Replace 'Ctrl' with 'Command' on Mac and replace 'Command' with 'Ctrl' on Windows and Linux.
 * @param keys An array of keys
 * @returns Accelerator string
 */
function accelerator(keys: Array<String>): String {

    let accel = keys.join('+');

    if (process.platform === 'darwin') {
        accel = accel.replace('Ctrl', 'Command');
    } else {
        accel = accel.replace('Command', 'Ctrl');
    }

    return accel;

}

export const mainMenuTemplate: Array<any> = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Reload',
                click() {
                    mainWindow.webContents.send('nmcli-get-connections', nmcli.getConnections());
                },
                accelerator: accelerator(['Ctrl', 'R'])
            },
            {
                label: 'Disable all',
                click() {
                    manageAutostart.disableAll();
                }
            },
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
                label: 'About',
                click() {
                    about.open();
                }
            },
            {
                label: 'Contribute',
                click() {
                    opn('https://github.com/olback/nm-vpn-switch')
                }
            },
            {
                label: 'Help',
                click(){
                    opn('https://github.com/olback/nm-vpn-switch/issues')
                }
            }
        ]
    }
];

// If on a mac, add empty object to menu
if (process.platform === 'darwin') {
    mainMenuTemplate.unshift({});
}

// Add dev tools item if DEV
if (process.env.NODE_ENV === 'dev') {
    mainMenuTemplate.push({
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
