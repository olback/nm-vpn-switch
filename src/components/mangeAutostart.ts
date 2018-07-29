/*
 * @Author: olback
 * @Date: 2018-07-29 21:55:07
 * @Last Modified by: olback
 * @Last Modified time: 2018-07-29 23:42:16
 */

import { mainWindow } from '../index';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

// type UUIDv4 = string;

const autostartDir = path.join(os.homedir(), '.config/autostart');

export function disableAll(): void {

    try {

        const files = fs.readdirSync(path.join(os.homedir(), '.config/autostart'), 'utf8').filter(e => {
            return e.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}\.nmac\.desktop/i);
        });

        files.forEach(f => {
            fs.unlinkSync(path.join(autostartDir, f));
        });

        mainWindow.webContents.send('info-message', {
            error: false,
            message: 'All VPN connections disabled on boot'
        });

    } catch(e) {

        mainWindow.webContents.send('info-message', {
            error: true,
            message: e.message
        });

    }

}

// export function enable(uuid: UUIDv4) {

// }

// export function disable(uuid: UUIDv4) {

// }

