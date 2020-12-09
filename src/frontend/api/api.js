const ipcRenderer = window.ipcRenderer;

const ApiHelper = {
    send: (target, msg) => ipcRenderer.invoke(target, msg ? JSON.stringify(msg) : null),
    event: {
        on: (event, callback) => ipcRenderer.on(event, callback),
        off: (event) => ipcRenderer.removeAllListeners(event),
    }
};


export default ApiHelper;