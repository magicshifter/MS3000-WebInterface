require('babel-register');

const config = require('../config');
const debug = require('debug')('app:bin:compile');
const fs = require('fs-extra');

const path = require('path');

const paths = config.utils_paths;

debug('Create webpack compiler.');
const compiler = require('webpack')(require('../build/webpack.config'));

compiler.run(function (err, stats) {
  const jsonStats = stats.toJson();

  debug('Webpack compile completed.');
  console.log(stats.toString(config.compiler_stats));

  if (err) {
    debug('Webpack compiler encountered a fatal error.', err);
    process.exit(1);
  } else if (jsonStats.errors.length > 0) {
    debug('Webpack compiler encountered errors.');
    console.log(jsonStats.errors);
    process.exit(1);
  } else if (jsonStats.warnings.length > 0) {
    debug('Webpack compiler encountered warnings.');

    if (config.compiler_fail_on_warning) {
      process.exit(1);
    }
  } else {
    debug('No errors or warnings encountered.');
  }

  debug('Copy static assets to dist folder.');
  fs.copySync(paths.client('static'), paths.dist());

  debug('Create Inlined Html');
  var fileContent = fs.readFileSync(path.join(paths.dist(), 'index.html'), 'utf8');
  fileContent = fileContent.replace(
    '<script src="vendor.js"></script><script src="app.js"></script>',
    '<script src="index.js"></script>'
  );

  fs.writeFileSync(path.join(paths.dist(), 'min.html'), fileContent, 'utf8');

  var appCacheDistFile = path.join(paths.dist(), 'magicshifter.appcache');
  var appCacheSrcFile = path.join(paths.client(), 'magicshifter.appcache');
  console.log('writing from', appCacheSrcFile, 'to', appCacheDistFile);

  var appCacheContent = fs.readFileSync(appCacheSrcFile, 'utf8');
  appCacheContent = appCacheContent.replace(
    '|DATE|',
    new Date()
  );

  fs.writeFileSync(appCacheDistFile, appCacheContent, 'utf8');
  console.log('appcache copying finished');
});
