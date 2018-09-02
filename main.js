// Modules to control application life and create native browser window
const {app, Menu, Tray, BrowserWindow, globalShortcut} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let tray

function createWindow () {

  // cfeate config
  let config = {width: 400, height: 300, frame: false}

  // Create the browser window.
  mainWindow = new BrowserWindow(config)

  // Set always on top
  app.dock.hide();
  mainWindow.setAlwaysOnTop(true, "floating");
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })


  globalShortcut.register('CommandOrControl+Shift+V', () => {
    mainWindow.webContents.send('newlink', 'ping')
  })

}

let createMenuTray = () => {
    tray = new Tray('icon.png')
    const contextMenu = Menu.buildFromTemplate([
        {role: 'about'},
        {label: 'Quit', click() {app.quit()} }
    ])
    tray.setToolTip('H2')
    tray.setContextMenu(contextMenu)
    tray.on('click', function (event) {
        console.log('called')
        !mainWindow.isFocused() ? mainWindow.focus(): true;
    })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow()
    createMenuTray()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.