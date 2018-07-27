// const package = require('./../../package.json');
// console.log(package);

const path = require('path');
const electron = require('electron');
const pkg = require(path.join(__dirname, '..', 'package.json'));

console.log(pkg);

document.getElementById('author').innerHTML += pkg.author;
document.getElementById('version').innerHTML += pkg.version;


