const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow = null;
let forceQuit = null;
function createWindow() {
  return new BrowserWindow({
    width: 1200,
    height: 800,
  });
}

app.on('ready', async () => {
  mainWindow = createWindow();

  mainWindow.loadFile(path.resolve(path.join(__dirname, './ui/index.html')));

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app

    if (process.platform === 'darwin') {
      mainWindow.on('close', function (e) {
        if (!forceQuit) {
          e.preventDefault();
          mainWindow.hide();
        }
      });

      app.on('activate', () => {
        mainWindow.show();
      });

      app.on('before-quit', () => {
        forceQuit = true;
      });
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null;
      });
    }
  });
});
