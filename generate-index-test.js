const start = Date.now();

const fs = require('fs');
const {join, basename} = require('path');
const {EOL} = require('os');

const dir = join(__dirname, 'src', 'operators');
const operatorNames = fs.readdirSync(dir)
  .filter(n => n !== 'index.ts')
  .map(n => basename(n, '.ts'));

const imports = [
  "import {expect} from 'chai';",
  "import * as operators from '../../src/operators';"
];

const testCases = [];

for (const op of operatorNames) {
  imports.push(`import {${op}} from '../../src/operators/${op}';`);
  testCases.push(
    `  describe('${op}', () => {`,
    `    it('Should be exported', () => {`,
    `      expect(operators).to.haveOwnProperty('${op}');`,
    `    });`,
    '',
    `    it('Should === ${op} exported from its own file', () => {`,
    `      expect(operators.${op}).to.equal(${op}, '${op} !==');`,
    `    });`,
    '  });',
    ''
  );
}

const outLines = [
  '//tslint:disable:ordered-imports',
  '',
  ...imports,
  '',
  "describe('operators/index', () => {",
  `  ${testCases.join(EOL).trim()}`,
  '});'
];

fs.writeFileSync(join(__dirname, 'test', 'operators', 'index.ts'), outLines.join(EOL));

process.stdout.write(`test/operators/index.ts test generated in ${(Date.now() - start).toLocaleString()} ms${EOL}`);
