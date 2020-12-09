import { SerialPortController } from "../controller/serialport";
import EVENTS from '../../common/events';

function noCheckMiddleware(handle, e, m) {
    let v = m ? JSON.parse(m) : null;
    return handle(v);
}

export default class IpcApi {
    constructor(ipcMain, webContents) {
        this.ipcMain = ipcMain;
        this.webContents = webContents;
    }

    destructor() {
        this.removeHandlers();
    }

    init() {
        this.initHandles();
    }

    initHandles() {
        this.ipcMain.handle(EVENTS.GET_SERIALPORT_LIST, (e, m) => noCheckMiddleware(SerialPortController.getSerialPortList, e, m));
        this.ipcMain.handle(EVENTS.GET_SERIALPORT_STATUS, (e, m) => noCheckMiddleware(SerialPortController.getSerialPortStatus, e, m));
        this.ipcMain.handle(EVENTS.OPEN_OR_CLOSE_SERIALPORT, (e, m) => noCheckMiddleware(SerialPortController.openOrCloseSerialPort, e, m));
    }

    removeHandlers() {
        for (const KEY in EVENTS) {
            this.ipcMain.removeHandler(EVENTS[KEY]);
        }
    }
}