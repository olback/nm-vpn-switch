"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function getConnections() {
    const raw = child_process_1.execSync('nmcli connection | grep "vpn"').toString();
    const rawArr = raw.split('\n').filter(n => n);
    const connections = [];
    rawArr.forEach(con => {
        const conParts = con.split('  ').filter(p => p);
        connections.push({
            name: conParts[0].trim(),
            uuid: conParts[1].trim(),
            type: conParts[2].trim(),
            interface: conParts[3].trim() !== '--' ? conParts[3].trim() : null,
            active: conParts[3].trim() !== '--' ? true : false
        });
    });
    return connections;
}
exports.getConnections = getConnections;
function setActive(uuid) {
    try {
        child_process_1.execSync(`nmcli connection up uuid '${uuid}'`);
    }
    catch (e) {
        throw e;
    }
}
exports.setActive = setActive;
function setDeactive(uuid) {
    try {
        child_process_1.execSync(`nmcli connection down uuid '${uuid}'`);
    }
    catch (e) {
        throw e;
    }
}
exports.setDeactive = setDeactive;
