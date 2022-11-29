const { app, Menu, Tray, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 450,
    height: 150,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "src/script.js"),
    },
  });
  win.loadFile("index.html");

  win.on("minimize", function (e) {
    e.preventDefault();
    win.hide();
  });

  win.on("close", function (e) {
    if (!app.isQuiting) {
      e.preventDefault();
      win.hide();
    }
    return false;
  });
}

app.whenReady().then(function () {
  createWindow();
  const tray = new Tray(path.join(__dirname, "src/icons/capture.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit",
      click: function () {
        app.exit(0);
      },
    },
  ]);
  tray.setToolTip("Logseq Quick Note");
  tray.setContextMenu(contextMenu);
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
