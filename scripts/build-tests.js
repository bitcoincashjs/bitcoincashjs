/**
 * @license
 * https://github.com/bitcoincashjs/bitcoincashjs
 * Copyright (c) 2018 Emilio Almansi
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */

const shell = require('shelljs'); // eslint-disable-line import/no-extraneous-dependencies

shell.config.fatal = true;

shell.rm('-rf', '.build');
shell.mkdir('-p', '.build');

shell.exec('find test/ -type f -name "*.js"', { silent: true })
  .exec('xargs npx browserify -t brfs', { silent: true })
  .to('.build/tests.js');
shell.echo('Generated file: .build/tests.js.');
