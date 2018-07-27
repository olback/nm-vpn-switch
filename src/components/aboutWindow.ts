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
