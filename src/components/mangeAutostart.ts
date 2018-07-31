/*
 * @Author: olback
 * @Date: 2018-07-29 21:55:07
 * @Last Modified by: olback
 * @Last Modified time: 2018-07-31 16:39:55
 */

import { mainWindow } from '../index';
import * as nmcli from './nmcliInterface';
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

export function enable(con: nmcli.Connection): void {

    try {

        if (isEnabled(con.uuid)) {

            throw {
                error: true,
                message: 'Alreade enabled.'
            }

        } else {

            fs.writeFileSync(fp(con.uuid), `[Desktop Entry]\nType=Application\nName=${con.name}\nDescription=Connect ${con.name} on login.\nExec=nmcli con up uuid '${con.uuid}'\n`, { encoding: 'utf8' });

        }

    } catch (e) {

        throw e;

    }

}

export function disable(con: nmcli.Connection): void {

    try {

        if (isEnabled(fp(con.uuid))) {

            fs.unlinkSync(fp(con.uuid));

        } else {

            throw {
                error: true,
                message: 'Already disabled.'
            }

        }

    } catch (e) {

        throw e;

    }

}

export function isEnabled(path: string): boolean {

    return fs.existsSync(path);

}

export function fp(uuid: nmcli.Connection['uuid']): string {

    return path.join(os.homedir(), '.config', 'autostart', `${uuid}.nmac.desktop`)

}

