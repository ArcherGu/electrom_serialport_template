'use strict';
import { app, protocol, BrowserWindow, ipcMain, globalShortcut, session } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import IpcApiClass from "./backend/api";
import path from 'path';
const isDevelopment = process.env.NODE_ENV !== 'production';

let win;
let ipcApi;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
]);

async function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: true,
            webSecurity: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        },
        title: 'Hifu探头测试',
        // autoHideMenuBar: true
    });

    ipcApi = new IpcApiClass(ipcMain, win.webContents);
    ipcApi.init();

    // win.maximize();

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html');
    }

    win.on('closed', () => {
        win = null;
        ipcApi.destructor();
        ipcApi = null;
    });
}

async function initVueDevtools() {
    if (isDevelopment && !process.env.IS_TEST) {
        try {
            // await installVueDevtools();

            // Windows: C:\Users\UserName\AppData\Local\Google\Chrome\User Data\Default\Extensions\nhdogjmejiglipccpnnnanhbledajbpd\5.1.1_0 
            // Mac Os: /Users/UserName/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/5.3.3_0
            // Linux: /AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/5.1.1_0
            // BrowserWindow.addDevToolsExtension("C:\\Users\\DELL\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\5.3.3_0")
            if (process.platform === 'win32') {
                await session.defaultSession.loadExtension("C:\\Users\\DELL\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\5.3.3_0");
            }
            else if (process.platform === 'darwin') {
                await session.defaultSession.loadExtension("/Users/archergu/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/5.3.3_0");
            }
        } catch (e) {
            // console.error('Vue Devtools failed to install:', e.toString());
        }
    }

    // 在开发环境和生产环境均可通过快捷键打开devTools
    globalShortcut.register('CommandOrControl+Shift+i', function () {
        win.webContents.openDevTools();
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    initVueDevtools();
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit();
            }
        });
    } else {
        process.on('SIGTERM', () => {
            app.quit();
        });
    }
}
