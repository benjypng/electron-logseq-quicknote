const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 450,
    height: 100,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "src/script.js"),
    },
  });
  win.loadFile("index.html");
  win.on("minimize", function (e) {
    e.preventDefault();
    mainWindow.hide();
  });

  win.on("close", function (e) {
    if (!application.isQuiting) {
      e.preventDefault();
      mainWindow.hide();
    }
    return false;
  });
}

app.whenReady().then(function () {
  createWindow();
});

app.on("ready", () => {
  globalShortcut.register("CommandOrControl+L", createWindow);
});

app.on("window-all-closed", function (e) {
  e.preventDefault();
  e.returnValue = false;
});

app.on("will-quit", function () {
  globalShortcut.unregisterAll();
});
