const {join} = require('path');
const {BannerPlugin} = require('webpack');
const fs = require('fs');

const basedir = join(__dirname, 'dist', '_bundle');

const license = (() => {
  return [
    '/**',
    ' * @license',
    ...fs.readFileSync(join(__dirname, 'LICENSE'), 'utf8').trim().split(/\n/g)
      .map(l => ` * ${l}`),
    ' */',
    ''
  ].join('\n')
})();

function conf(prod) {
  const base = {
    target: 'web',
    mode: 'production',
    entry: join(__dirname, 'src', 'index.ts'),
    devtool: false,
    output: {
      path: basedir,
      filename: prod ? 'umd.min.js' : 'umd.js'
    },
    externals: {
      lodash: '_',
      rxjs: 'rxjs',
      'rxjs/operators': ['rxjs', 'operators'],
      'lodash/pick': ['_', 'pick'],
      'lodash/get': ['_', 'get'],
      'lodash/isObject': ['_', 'isObject'],
      'lodash/isEqual': ['_', 'isEqual']
    },
    resolve: {
      extensions: ['.ts', '.js'],
      mainFields: ['fesm2015', 'es2015', 'esm2015', 'module', 'fesm5', 'esm5', 'browser', 'main']
    },
    module: {
      rules: [{
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: 'tsconfig.cjs.json',
            context: __dirname,
            colors: true,
            compilerOptions: {
              module: 'es2015'
            }
          }
        }]
      }]
    },
    plugins: [
      new BannerPlugin({
        banner: license,
        raw: true
      })
    ],
    optimization: {}
  };
  if (prod) {
    const TerserPlugin = require('terser-webpack-plugin');
    base.optimization.minimizer = [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: /license/
          }
        }
      })
    ];
    base.optimization.minimize = true;
  } else {
    base.optimization.minimize = false;
  }

  return base;
}

module.exports = [
  conf(false),
  conf(true)
];
