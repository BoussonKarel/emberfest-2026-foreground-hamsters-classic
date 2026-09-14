'use strict';

const funnel = require('broccoli-funnel');
const replace = require('broccoli-string-replace');

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const isDevelopment = EmberApp.env() === 'development';

const packageJson = require('./package.json');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-babel': { enableTypeScriptTransform: true },

    // Add options here
  });

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    staticEmberSource: true,
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    packagerOptions: {
      webpackConfig: {
        devtool: 'cheap-source-map',
      },
    },
    extraPublicTrees: [
      // Support different values per environment:
      replace(funnel('chrome-extension', { files: ['manifest.json'] }), {
        patterns: [
          {
            match: /{{EXT_NAME}}/g,
            replacement: 'Classic Hamster Wacking',
          },
          {
            match: /{{EXT_VERSION}}/g,
            replacement: packageJson.version,
          },
          {
            match: /{{EXT_KEY}}/g,
            replacement: isDevelopment
              ? 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsbzLw78qwq6ZfdN+aRsCUfq180/EAwhs3XXh7HxqVSIF0ZvB9sg/dNNjbTm5gopGgsWPgQ+KwDiZzyXNeSNz6HOrgNGKOGSCq7TNffCFE9HG4F/v4ckXxcsLbHz1IOvrPqgCM5aCEHuUM+L/wynL9a2CgUeA9gf7SL/sKrMXlfhd2BASZ7rnS/d838dQ+iW3MjBI5SM5BXYx+VdN0T1j49I0zRI8jZ9VZEEnJRcDKtULZZBb4ShvlRtZ5BkllAnw/VtxEBcw+zsJrr9q+Sf2TqS/rFOXp2FbxKPBxHzvSd/uo5HYSnlAmMjo+98CiN05CcPOHcJzy0v6XdmfnDwcowIDAQAB'
              : 'GENERATED_BY_CHROME',
          },
        ],
      }),
      funnel('chrome-extension', { files: ['background.js', 'hamsters.js'] }),
    ],
  });
};
