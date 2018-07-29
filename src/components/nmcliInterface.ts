/*
 * @Author: olback
 * @Date: 2018-07-29 18:43:01
 * @Last Modified by:   olback
 * @Last Modified time: 2018-07-29 18:43:01
 */

import { execSync } from 'child_process';

type Connections = Array<Connection>;

export interface Connection {
    name: string;
    uuid: string;
    type: string;
    interface: string | null;
    active: boolean;
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
            active: conParts[3].trim() !== '--' ? true : false
        });

    })

    return connections;

}

export function setActive(uuid: Connection['uuid']): void {

    try {

        execSync(`nmcli connection up uuid '${uuid}'`);

    } catch (e) {

        throw e;

    }

}

export function setDeactive(uuid: Connection['uuid']): void {

    try {

        execSync(`nmcli connection down uuid '${uuid}'`);

    } catch (e) {

        throw e;

    }

}

// /**
//  * Returns an array of active Connections.
//  * Returns an empty array if there are no connections.
//  * @returns Connections<Connection>
//  */
// export function getActive(): Connections {

//     const connections: Connections = getConnections();
//     const active: Connections = [];

//     connections.forEach(con => {

//         if (con.active) {
//             active.push(con);
//         }

//     });

//     return active;

// }
