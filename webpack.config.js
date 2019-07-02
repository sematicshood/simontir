const path = require('path');

function srcPath(subdir) {
    return path.join(__dirname, "src", subdir);
}

module.exports = {
    resolve: {
        alias: {
            views: srcPath('views'),
            helpers: srcPath('helpers'),
            components: srcPath('components'),
            assets: srcPath('assets'),
            api: srcPath('api'),
            modules: srcPath('modules'),
            dataJson: srcPath('data'),
        },
    },
};