import {Project, SourceFile, StatementStructures} from 'ts-morph';

const regImport = /import\s+([a-zA-Z]+)\s+=\s+require\s*\(\s*['"]lodash/;

function processFile(file: SourceFile): void {
  let needsWrite = false;

  const fileStructure = file.getStructure();
  const statements = <StatementStructures[]>fileStructure.statements;

  for (let i = 0; i < statements.length; i++) {
    const rawStmt = <any>statements[i];

    if (typeof rawStmt !== 'string') {
      continue;
    }

    const match = rawStmt.match(regImport);
    if (!match) {
      continue;
    }

    statements[i] = <any>`import ${match[1]} from 'lodash/${match[1]}';`;
    needsWrite = true;
  }

  if (needsWrite) {
    file.set(fileStructure);
    file.formatText({
      baseIndentSize: 0,
      convertTabsToSpaces: true,
      ensureNewLineAtEndOfFile: true,
      indentSize: 2,
      insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: false,
      newLineCharacter: '\n',
      tabSize: 2
    });
    file.saveSync();
  }

}

const project = new Project({addFilesFromTsConfig: false});
project.addExistingSourceFiles('src-esm/**/*.ts');

const sourceFiles = project.getSourceFiles();

for (const f of sourceFiles) {
  processFile(f);
}
