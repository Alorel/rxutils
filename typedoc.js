module.exports = {
  hideGenerator: true,
  mode: 'file',
  module: 'umd',
  readme: 'README.md',
  name: 'RxUtils',
  target: 'ES6',
  excludeNotExported: true,
  json: 'doc.json',
  categorizeByGroup: true,
  includeDeclarations: true,
  excludeExternals: true,
  gitRevision: require('./package').version
};
