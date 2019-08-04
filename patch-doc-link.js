const fs = require('fs');
const {join} = require('path');

const PATH = join(__dirname, 'README.md');
const VERSION = require('./package.json').version;

const contents = fs.readFileSync(PATH, 'utf8')
  .replace(
    /Full API docs and examples for version [a-zA-Z0-9\.-]+/,
    `Full API docs and examples for version ${VERSION}`
  )
  .replace(/tree\/[a-zA-Z0-9\.-]+\/docs/, `tree/${VERSION}/docs`);

fs.writeFileSync(PATH, contents);
