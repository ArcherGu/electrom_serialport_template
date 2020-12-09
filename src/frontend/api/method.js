import ApiHelper from './api';
import EVENTS from '../../common/events';

export function getSerialPortList() {
    return ApiHelper.send(EVENTS.GET_SERIALPORT_LIST).then(response => JSON.parse(response));
}

export function getSerialPortStatus() {
    return ApiHelper.send(EVENTS.GET_SERIALPORT_STATUS).then(response => JSON.parse(response));
}

export function openOrCloseSerialPort(data) {
    return ApiHelper.send(EVENTS.OPEN_OR_CLOSE_SERIALPORT, data).then(response => JSON.parse(response));
}