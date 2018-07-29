/*
 * @Author: olback
 * @Date: 2018-07-29 18:42:12
 * @Last Modified by:   olback
 * @Last Modified time: 2018-07-29 18:42:12
 */

import * as about from 'about-window';
const pkg = require('../../package.json');

export function open() {

    about.default({
        icon_path: '../../view/img/icon.png',
        package_json_dir: '../',
        description: pkg.description,
        win_options: {
            resizable: false
        }
    });

}
