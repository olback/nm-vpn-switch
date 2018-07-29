/*
 * @Author: olback
 * @Date: 2018-07-29 18:42:37
 * @Last Modified by:   olback
 * @Last Modified time: 2018-07-29 18:42:37
 */

import { ipcMain } from 'electron';
import * as nmcli from './nmcliInterface';

export function ipcEvents() {

    ipcMain.on('nmcli-get-connections', event => {
        event.sender.send('nmcli-get-connections', nmcli.getConnections());
    });

    ipcMain.on('nmcli-set-active', (event, data: nmcli.Connection) => {

        try {
            nmcli.setActive(data.uuid);
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
            nmcli.setDeactive(data.uuid);
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
