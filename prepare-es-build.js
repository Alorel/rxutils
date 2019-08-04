const fs = require('fs-extra');
const Bluebird = require('bluebird');
const glob = require('glob');

const regImport = /import\s+([a-zA-Z]+)\s+=\s+require\s*\(\s*['"]lodash\/[a-zA-Z]+['"]\s*\)\s*;?/g;
const regMatch = /^import ([a-zA-Z]+)/;

Bluebird.promisify(glob)('src-esm/**/*.ts', {cwd: __dirname, absolute: true})
  .map(async path => {
    const contents = await fs.readFile(path, 'utf8');
    const imports = contents.match(regImport);

    return {path, contents, imports};
  })
  .filter(({imports}) => !!imports)
  .map(({path, contents, imports}) => {
    let newImport = imports
      .map(stmt => {
        const match = stmt.trim().match(regMatch);
        if (!match) {
          throw new Error('Unable to refactor lodash import');
        }

        return match[1];
      });
    newImport.sort();
    newImport = `import {${newImport.join(', ')}} from 'lodash-es';`;

    for (const imp of imports) {
      contents = contents.replace(imp, '');
    }
    contents = `${newImport}\n${contents.trim()}`;

    return fs.writeFile(path, contents);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
