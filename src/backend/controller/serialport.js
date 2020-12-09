const SerialPort = require('serialport');
import BaseControllerClass from './base';
import APP_CONFIG from "../config";

class SerialPortControllerClass extends BaseControllerClass {
    constructor() {
        super();

        this.getSerialPortStatus = this.getSerialPortStatus.bind(this);
        this.getSerialPortList = this.getSerialPortList.bind(this);
        this.openOrCloseSerialPort = this.openOrCloseSerialPort.bind(this);
    }

    getSerialPortStatus() {
        return new Promise(async (resolve, reject) => {
            try {
                return resolve(this.toResponse({
                    port: this.port ? this.port.path : null,
                    isOpen: this.port ? this.port.isOpen : false
                }));
            } catch (error) {
                console.log(error);
                resolve(this.toError(error));
            }
        });
    }

    getSerialPortList() {
        return new Promise(async (resolve, reject) => {
            try {
                let ports = await SerialPort.list();

                resolve(this.toResponse(ports.map(port => port.path)));
            } catch (error) {
                console.log(error);
                resolve(this.toError(error));
            }
        });
    }

    openOrCloseSerialPort(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.port && data.isOpen && data.port) {
                    this.createPort(data.port);
                }

                if (this.port && data.isOpen && this.port.path !== data.port) {
                    this.createPort(data.port);
                }

                if (data.isOpen) {
                    this.port.open((err) => {
                        if (err) {
                            return resolve(this.toResponse(err.message));
                        }
                        resolve(this.toResponse('SUCCESS'));
                    });
                }
                else {
                    this.port.close((err) => {
                        if (err) {
                            return resolve(this.toResponse(err.message));
                        }
                        resolve(this.toResponse('SUCCESS'));
                    });
                }
            } catch (error) {
                console.log(error);
                resolve(this.toError(error));
            }
        });
    }

    createPort(portName) {
        if (this.port) {
            this.port.close();
            this.port.destroy();
        }

        const config = APP_CONFIG.SerialPort;
        this.port = new SerialPort(portName, {
            autoOpen: false,
            baudRate: config.BaudRate,
            dataBits: config.DataBits,
            stopBits: config.StopBits,
            parity: config.Parity
        });

        this.port.on('data', function (data) {
            console.log('Data:', data);
        });
    }

    send(msg) {
        this.port.write('Hello SerialPort', function (err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');
        });
    }
}

const SerialPortController = new SerialPortControllerClass();
export { SerialPortController };