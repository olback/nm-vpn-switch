"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const nmcli = require("./nmcliInterface");
function ipcEvents() {
    electron_1.ipcMain.on('nmcli-get-connections', event => {
        event.sender.send('nmcli-get-connections', nmcli.getConnections());
    });
    electron_1.ipcMain.on('nmcli-set-active', (event, data) => {
        try {
            nmcli.setActive(data.uuid);
            event.sender.send('info-message', {
                error: false,
                message: `${data.name} connected.`
            });
        }
        catch (e) {
            event.sender.send('info-message', {
                error: true,
                message: e.message
            });
        }
    });
    electron_1.ipcMain.on('nmcli-set-deactive', (event, data) => {
        try {
            nmcli.setDeactive(data.uuid);
            event.sender.send('info-message', {
                error: false,
                message: `${data.name} disconnected.`
            });
        }
        catch (e) {
            event.sender.send('info-message', {
                error: true,
                message: e.message
            });
        }
    });
}
exports.ipcEvents = ipcEvents;
