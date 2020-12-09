const fs = require('fs');
import path from 'path';
const isDevelopment = process.env.NODE_ENV !== 'production';

const startPath = path.join(__dirname, '..');
function resolvePath(dirPath) {
    return path.join(startPath, dirPath || '.');
};

let err;
let APP_CONFIG;

export function readAppConfig() {
    try {
        const fileName = isDevelopment ? 'config/config.dev.json' : 'config.json';
        const fileLocation = resolvePath(fileName);
        const fileContents = fs.readFileSync(fileLocation, 'utf8');

        APP_CONFIG = JSON.parse(fileContents);
    } catch (error) {
        err = error;
    }
}

readAppConfig();

export default APP_CONFIG;