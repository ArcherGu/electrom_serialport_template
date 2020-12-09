const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: './',
    lintOnSave: false,
    devServer: {
        host: 'localhost',
        port: 8100
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src/frontend'));
    },
    configureWebpack: {
        devtool: 'souce-map'
    },
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
            externals: ['serialport'],
            builderOptions: {
                nsis: {
                    oneClick: false,
                    allowElevation: true,
                    allowToChangeInstallationDirectory: true,
                    createDesktopShortcut: true,
                    createStartMenuShortcut: true
                },
                extraResources: [
                    {
                        from: 'config/config.json',
                        to: 'config.json'
                    }
                ],
                electronDownload: {
                    mirror: 'https://npm.taobao.org/mirrors/electron/'
                }
            }
        }
    }
};
