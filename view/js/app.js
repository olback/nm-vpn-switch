/*
 * @Author: olback
 * @Date: 2018-07-29 18:43:35
 * @Last Modified by: olback
 * @Last Modified time: 2018-07-29 23:02:56
 */

const electron = require('electron');
const { ipcRenderer } = electron;

function showModal(title = '', body = '') {

    $('#modal-header').text(title);
    $('#modal-body').text(body);
    $('#modal1').modal('open');

}

ipcRenderer.on('nmcli-get-connections', (_, data) => {
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    data.forEach(c => {

        tbody.innerHTML += `
        <tr>
            <td>${c.name}</td>
            <td>
            ${
                c.active ? `<button class="btn waves-effect waves-light red" onclick="d('${btoa(JSON.stringify(c))}')">Disconnect</button>` :
                `<button class="btn waves-effect waves-light" onclick="c('${btoa(JSON.stringify(c))}')">Connect</button>`
            }
            </td>
        </tr>`;

    });

});

ipcRenderer.on('info-message', (_, m) => {

    showModal('Alert', m.message);

});

window.onload = () => {
    ipcRenderer.send('nmcli-get-connections');
    $('.modal').modal()
}

setInterval(() => {
    ipcRenderer.send('nmcli-get-connections');
}, 1000);

function c(con) {
    ipcRenderer.send('nmcli-set-active', JSON.parse(atob(con)));
}

function d(con) {
    ipcRenderer.send('nmcli-set-deactive', JSON.parse(atob(con)));
}
