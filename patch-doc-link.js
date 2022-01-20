/* eslint-disable */

const fs = require('fs');
const {join} = require('path');

const VERSION = require('./package.json').version;

function process(file, replacements) {
  let contents = fs.readFileSync(file, 'utf8');
  for (const [reg, repl] of replacements) {
    contents = contents.replace(reg, repl);
  }
  fs.writeFileSync(file, contents);
}

process(
  join(__dirname, 'README.md'),
  [
    [
      /Full API docs and examples for version [a-zA-Z0-9\.-]+/,
      `Full API docs and examples for version ${VERSION}`
    ],
    [/tree\/[a-zA-Z0-9\.-]+\/docs/, `tree/${VERSION}/docs`]
  ]
);
process(
  join(__dirname, 'docs', 'README.md'),
  [[
    /rxutils [0-9\.a-zA-Z]+ documentation/,
    `rxutils ${VERSION} documentation`
  ]]
);
