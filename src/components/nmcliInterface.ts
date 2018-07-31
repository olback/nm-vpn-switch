/*
 * @Author: olback
 * @Date: 2018-07-29 18:43:01
 * @Last Modified by: olback
 * @Last Modified time: 2018-07-31 16:21:21
 */

import { execSync } from 'child_process';
import { fp, isEnabled } from './mangeAutostart';

type Connections = Array<Connection>;

export interface Connection {
    name: string;
    uuid: string;
    type: string;
    interface: string | null;
    connected: boolean;
    enabled: boolean;
}

/**
 * Returns an array of active Connections.
 * Returns an empty array if there are no connections.
 * @returns Connections<Connection>
 */
export function getConnections(): Connections {

    const raw = execSync('nmcli connection | grep "vpn"').toString();
    const rawArr = raw.split('\n').filter(n => n);

    const connections: Connections = [];

    rawArr.forEach(con => {

        const conParts = con.split('  ').filter(p => p);

        connections.push({
            name: conParts[0].trim(),
            uuid: conParts[1].trim(),
            type: conParts[2].trim(),
            interface: conParts[3].trim() !== '--' ? conParts[3].trim() : null,
            connected: conParts[3].trim() !== '--' ? true : false,
            enabled: isEnabled(fp(conParts[1].trim()))
        });

    })

    return connections;

}

export function setActive(con: Connection): void {

    try {

        execSync(`nmcli connection up uuid '${con.uuid}'`);

    } catch (e) {

        throw e;

    }

}

export function setDeactive(con: Connection): void {

    try {

        execSync(`nmcli connection down uuid '${con.uuid}'`);

    } catch (e) {

        throw e;

    }

}

