/*
 * @Author: olback
 * @Date: 2018-07-29 18:42:37
 * @Last Modified by: olback
 * @Last Modified time: 2018-07-31 16:23:23
 */

import { ipcMain } from 'electron';
import * as nmcli from './nmcliInterface';
import * as manageAutostart from './mangeAutostart';
// import * as path from 'path';
// import * as fs from 'fs';
// import * as os from 'os';

export function nmcliActions(): void {

    ipcMain.on('nmcli-get-connections', event => {
        event.sender.send('nmcli-get-connections', nmcli.getConnections());
    });

    ipcMain.on('nmcli-set-active', (event, data: nmcli.Connection) => {

        try {
            nmcli.setActive(data);
            event.sender.send('info-message', {
                error: false,
                message: `${data.name} connected.`
            });
        } catch (e) {
            event.sender.send('info-message', {
                error: true,
                message: e.message
            });
        }

    });

    ipcMain.on('nmcli-set-deactive', (event, data: nmcli.Connection) => {

        try {
            nmcli.setDeactive(data);
            event.sender.send('info-message', {
                error: false,
                message: `${data.name} disconnected.`
            });
        } catch (e) {
            event.sender.send('info-message', {
                error: true,
                message: e.message
            });
        }

    });

}

export function autoStartActions(): void {

    ipcMain.on('manage-autostart-set-enable', (event, data: nmcli.Connection) => {

        try {
            manageAutostart.enable(data);
            event.sender.send('info-message', {
                error: false,
                message: `${data.name} enabled.`
            });
        } catch (e) {
            event.sender.send('info-message', {
                error: true,
                message: e.message
            });
        }

    });

    ipcMain.on('manage-autostart-set-disable', (event, data: nmcli.Connection) => {

        try {
            manageAutostart.disable(data);
            event.sender.send('info-message', {
                error: false,
                message: `${data.name} disabled.`
            });
        } catch (e) {
            event.sender.send('info-message', {
                error: true,
                message: e.message
            });
        }

    });

}
