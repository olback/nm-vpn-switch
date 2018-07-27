import * as process from 'process';
import * as electron from 'electron';

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
