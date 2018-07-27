const electron = require('electron');
const { ipcRenderer } = electron;

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
    // console.log(m);
    new Notification(document.title, {
        body: m.message,
        icon: 'img/icon.png'
    }).onclick = () => {
        console.log('click!');
    }
});

window.onload = () => {
    ipcRenderer.send('nmcli-get-connections');
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
