const {override} = require('customize-cra');
const {aliasDangerous, configPaths} = require('react-app-rewire-alias/lib/aliasDangerous');
const { removeModuleScopePlugin } = require('customize-cra');

module.exports = {webpack: override(aliasDangerous(configPaths('./tsconfig.paths.json'))),}

module.exports = function override(config, env) {
    if (!config.plugins) {
        config.plugins = [];
    }
    removeModuleScopePlugin()(config);

    return config;
};