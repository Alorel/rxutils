const fs = require('fs-extra');
const {join, basename} = require('path');
const {EOL} = require('os');

const additionalExports = [
  ['wasLogged', 'operators/logError'],
  ['setDefaultLogger', 'operators/logError'],
  ['NOOP_OBSERVER', 'util/NOOP_OBSERVER']
];

function generateIndex() {
  const dir = join(__dirname, 'src', 'creators');
  const creatorNames = fs.readdirSync(dir)
    .filter(n => n !== 'index.ts')
    .map(n => basename(n, '.ts'));

  const imports = [
    "import {expect} from 'chai';",
    "import * as index from '../src'",
    "import * as operators from '../src/operators'",
  ];

  const testCases = [
    "describe('index', () => {",
    "  it('Should export operators', () => {",
    "    expect(index).to.haveOwnProperty('operators');",
    '  });',
    '',
    "  it('Operators should === those exported from src/operators', () => {",
    "    expect(index.operators).to.deep.eq(operators);",
    '  });',
    ''
  ];

  for (const [name, path] of additionalExports) {
    imports.push(`import {${name}} from '../src/${path}';`);
    testCases.push(
      `  it('Should export ${name}', () => {`,
      `    expect(index).to.haveOwnProperty('${name}');`,
      '  });',
      '',
      `  it('Exported ${name} should === that from ${path}', () => {`,
      `    expect(index.${name}).to.equal(${name});`,
      '  });',
      ''
    );
  }

  for (const cr of creatorNames) {
    imports.push(`import {${cr}} from '../src/creators/${cr}';`);
    testCases.push(
      `  describe('${cr}', () => {`,
      `    it('Should be exported', () => {`,
      `      expect(index).to.haveOwnProperty('${cr}');`,
      `    });`,
      '',
      `    it('Should === ${cr} exported from its own file', () => {`,
      `      expect(index.${cr}).to.equal(${cr}, '${cr} !==');`,
      `    });`,
      '  });',
      ''
    );
  }

  testCases.push('});');

  const outLines = [
    '//tslint:disable',
    '',
    ...imports,
    '',
    testCases.join(EOL).trim(),
    ''
  ];

  fs.writeFileSync(join(__dirname, 'test', 'index.ts'), outLines.join(EOL));
}

function generateOperators() {
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
    '//tslint:disable',
    '',
    ...imports,
    '',
    "describe('operators/index', () => {",
    `  ${testCases.join(EOL).trim()}`,
    '});',
    ''
  ];

  fs.writeFileSync(join(__dirname, 'test', 'operators', 'index.ts'), outLines.join(EOL));
}

generateIndex();
generateOperators();
