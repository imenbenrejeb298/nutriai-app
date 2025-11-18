const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // These settings are crucial for the local storage logic to work
      nodeIntegration: true, // Allows renderer process to use Node.js APIs
      contextIsolation: false, // Allows window.require to work
      enableRemoteModule: true, // Allows access to app path
    }
  });

  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../build', 'index.html')}`;
  win.loadURL(startUrl);

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
