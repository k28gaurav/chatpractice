const path = require('path');
const fs = require('fs');
const getAbsPath = (_path) => path.resolve(__dirname, '../', _path);

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath)
        .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory());
}

const aliases = {
    app: getAbsPath('src'),
    actions: 'app/actions',
    reducers: 'app/reducers',
    constants: 'app/constants',
    apis: 'app/apis',
    modules: 'app/modules',
    sass: 'app/sass',
};

/*
    Add aliases programatically for all folders in src/modules, allows import Dashboard from 'Dashboard';
    which resolves to src/modules/Dashboard/index.js
*/
getDirectories(getAbsPath('src/modules')).forEach(module => {
    aliases[module] = `app/modules/${module}`;
});

module.exports = aliases;
