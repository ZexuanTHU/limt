import { app, BrowserWindow } from 'electron'; // eslint-disable-line
const fs = require('fs');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
let width = null;
process.env.NODE_ENV === 'development' ? (width = 1500) : (width = 900);
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\'); // eslint-disable-line
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080/'
    : `file://${__dirname}/index.html`;

/**
 * Create the browser window
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    height: 1200,
    width: width,
    titleBarStyle: 'hidden',
    vibrancy: 'ultra-dark',
    webPreferences: {webSecurity: false},
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import {autoUpdater} from 'electron-updater';

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates();
});
*/

const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

ipc.on('open-file-dialog-mt', function(event) {
  dialog.showOpenDialog(
    {
      properties: ['openFile', 'openDirectory'],
    },
    function(files) {
      if (files) event.sender.send('selected-mt', files);
    }
  );
});

ipc.on('open-file-dialog-map', function(event) {
  dialog.showOpenDialog(
    {
      properties: ['openFile', 'openDirectory'],
    },
    function(files) {
      if (files) event.sender.send('selected-map', files);
    }
  );
});

ipc.on('open-file-dialog-mat', function(event) {
  dialog.showOpenDialog(
    {
      properties: ['openFile', 'openDirectory'],
    },
    function(files) {
      if (files) event.sender.send('selected-mat', files);
    }
  );
});

ipc.on('read-file-by-path', (event) => {
  dialog.showOpenDialog(
    {
      properties: ['openFile', 'openDirectory'],
    },
    (files) => {
      if (files) {
        fs.readFile(files, (err, fileData) => {
          if (err) {
            alert('An error happened during reading file');
            return;
          }
          console.log('File content ' + fileData);
        });
      }
    }
  );
});
