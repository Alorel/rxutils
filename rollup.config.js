const {join} = require('path');
const {_buildBaseExternals, _buildUmdExternals} = require('./build/rollup/_baseExternals');
const {_buildLazyReq} = require('./build/rollup/_lazyReq');
const replacePlugin = require('@rollup/plugin-replace');

// ########## BEGIN SETUP

const CONFIG = {
  assetFileNames: '[name][extname]',
  get cjsPluginSettings() {
    return {
      extensions: CONFIG.extensions,
      sourceMap: CONFIG.sourcemap,
    };
  },
  distDir: join(__dirname, 'dist'),
  extensions: [
    '.js',
  ],
  mainFields: [
    'es2015',
    'module',
    'browser',
    'main'
  ],
  sourcemap: false,
  srcDir: join(__dirname, 'projects')
};

// ########## END SETUP

function createConfig(rollupConfig) {
  const {
    project,
    cjs2015 = false,
    fcjs2015 = false,
    esm2015 = false,
    fesm2015 = false,
    stdumd = false,
    dts = false,
    minumd = false,
    tsconfig = 'tsconfig.json',
    watch = false
  } = rollupConfig;

  if ([cjs2015, fcjs2015].filter(Boolean).length > 1) {
    throw new Error('These options are mutually exclusive: cjs2015, fcjs2015');
  } else if (![cjs2015, fcjs2015, esm2015, fesm2015, stdumd, minumd].some(Boolean)) {
    throw new Error('At least one option required: cjs2015, fcjs2015, esm2015, fesm2015, minumd, stdumd');
  }


  const distDir = join(CONFIG.distDir, project);
  const projectDir = join(CONFIG.srcDir, project);

  const baseSettings = {
    external: _buildBaseExternals,
    input: {
      index: join(projectDir, 'index.ts'),
      operators: join(projectDir, 'operators', 'index.ts')
    },
    watch: {
      exclude: 'node_modules/**/*'
    }
  };

  const baseOutput = {
    assetFileNames: CONFIG.assetFileNames,
    dir: distDir,
    entryFileNames: chunk => {
      if (chunk.name === 'index' || chunk.name === 'operators') {
        return 'index.js';
      }

      return `${chunk.name}.js`;
    },
    sourcemap: CONFIG.sourcemap
  };

  const tryAddCopyPlugin = (() => {
    let added = false;

    return () => {
      if (added) {
        return [];
      }

      added = true;

      return [
        require('@alorel/rollup-plugin-copy-pkg-json').copyPkgJsonPlugin({
          pkgJsonPath: join(projectDir, 'package.json')
        }),
        require('@alorel/rollup-plugin-copy').copyPlugin({
          copy: [
            {
              from: ['LICENSE', 'README.md'],
              opts: {glob: {cwd: __dirname}}
            },
            {
              from: [
                'operators/package.json',
                'types/*.d.ts'
              ],
              opts: {glob: {cwd: projectDir}}
            }
          ],
          defaultOpts: {
            emitNameKind: 'fileName'
          },
          watch
        })
      ]
    };
  })();

  let dtsEmitted = !dts;
  function tryEmitDts(compilerOptions) {
    if (dtsEmitted) {
      return compilerOptions;
    }

    dtsEmitted = true;
    return {
      ...compilerOptions,
      declaration: true,
    };
  }

  function getBasePlugins(ecma, compilerOpts) {
    const cjsSettings = CONFIG.cjsPluginSettings;

    return [
      _buildLazyReq.nodeResolve(CONFIG),
      cjsSettings && require('@rollup/plugin-commonjs')(cjsSettings),
      require('rollup-plugin-typescript2')({
        tsconfig,
        tsconfigOverride: {
          compilerOptions: {
            rootDir: `projects/${project}`,
            ...compilerOpts
          },
        },
      }),
      replacePlugin({
        exclude: /node_modules[\\/]/,
        include: /src[\\/].+\.ts/,
        preventAssignment: true,
        values: {
          'process.env.ES_TARGET': JSON.stringify(ecma)
        }
      })
    ].filter(Boolean);
  }

  const outConfig = [];

  if (cjs2015 || esm2015) {
    const es6BaseOutput = {
      ...baseOutput,
      preferConst: true
    };

    if (cjs2015) {
      outConfig.push({
        ...baseSettings,
        output: {
          ...es6BaseOutput,
          format: 'cjs'
        },
        plugins: [
          ...getBasePlugins('es2015', tryEmitDts()),
          ...tryAddCopyPlugin()
        ],
        preserveModules: true
      })
    }
    if (esm2015) {
      outConfig.push({
        ...baseSettings,
        output: {
          ...es6BaseOutput,
          dir: dtsEmitted ? join(distDir, '_esm2015') : distDir,
          format: 'es'
        },
        plugins: [
          ...getBasePlugins('es2015', tryEmitDts()),
          ...tryAddCopyPlugin()
        ],
        preserveModules: true
      })
    }
  }

  if (fcjs2015 || fesm2015) {
    const fesm2015BaseOutput = {
      ...baseOutput,
      banner: _buildLazyReq.bannerFn,
      preferConst: true
    };

    if (fcjs2015) {
      outConfig.push({
        ...baseSettings,
        output: {
          ...fesm2015BaseOutput,
          format: 'cjs'
        },
        plugins: [
          ...getBasePlugins('es2015', tryEmitDts()),
          ...tryAddCopyPlugin(),
        ],
        preserveModules: false
      });
    }

    if (fesm2015) {
      outConfig.push({
        ...baseSettings,
        output: {
          ...fesm2015BaseOutput,
          dir: dtsEmitted ? join(distDir, '_fesm2015') : distDir,
          format: 'es'
        },
        plugins: [
          ...getBasePlugins('es2015', tryEmitDts()),
          ...tryAddCopyPlugin(),
        ],
        preserveModules: false,
      });
    }
  }

  return outConfig;
}

module.exports = function (inConfig) {
  const projects = inConfig.projects ?
    inConfig.projects.split(',') :
    require('./build/rollup/_syncPkg')._buildGetProjects();
  delete inConfig.projects;

  const out = projects.flatMap(project => createConfig({...inConfig, project}));

  for (const p of ['dts', 'projects', 'cjs2015', 'fcjs2015', 'esm2015', 'fesm2015', 'stdumd', 'minumd', 'tsconfig']) {
    delete inConfig[p];
  }

  return out;
};

Object.defineProperty(module.exports, '__esModule', {value: true});
module.exports.default = module.exports;
