import {copyPlugin} from "@alorel/rollup-plugin-copy";
import {copyPkgJsonPlugin} from "@alorel/rollup-plugin-copy-pkg-json";
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import typescript from 'rollup-plugin-typescript2';
import {join} from "path";

export default function ({watch}) {
  const regTs = /\.ts$/;
  const baseCfg = {
    external: [
      'lodash',
      'lodash-es',
      'rxjs',
      'rxjs/operators',
      'tslib',
    ],
    output: {
      entryFileNames: ({name}) => name === 'index' || name === 'operators' ? 'index.js' : `${name}.js`,
      preferConst: true,
      sourcemap: false,
    },
    plugins: [
      nodeResolve({
        exportConditions: [
          'es2015',
          'module',
          'import',
          'default',
        ],
        mainFields: [
          'es2015',
          'esm2015',
          'module',
          'browser',
          'main',
        ],
      }),
      commonjs(),
    ],
    preserveModules: true,
    input: {
      index: 'projects/rxutils/index.ts',
      operators: 'projects/rxutils/operators/index.ts',
    },
    watch: {
      exclude: 'node_modules/**/*'
    },
  };

  return [
    {
      ...baseCfg,
      output: {
        dir: 'dist/rxutils',
        ...baseCfg.output,
        format: 'cjs',
      },
      plugins: [
        ...baseCfg.plugins,
        typescript({
          tsconfig: 'tsconfig.json',
          tsconfigOverride: {
            compilerOptions: {
              rootDir: join(__dirname, 'projects', 'rxutils'),
              declaration: true,
            },
          },
        }),
        copyPkgJsonPlugin({
          pkgJsonPath: 'projects/rxutils/package.json',
        }),
        copyPlugin({
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
              opts: {glob: {cwd: 'projects/rxutils'}}
            }
          ],
          defaultOpts: {
            emitNameKind: 'fileName'
          },
          watch
        }),
      ]
    },
    {
      ...baseCfg,
      output: {
        dir: 'dist/rxutils/_esm2015',
        ...baseCfg.output,
        format: 'es',
      },
      plugins: [
        ...baseCfg.plugins,
        {
          name: 'lodash-loader',
          transform(code, id) {
            if (regTs.test(id)) {
              return code.replaceAll(" from 'lodash'", " from 'lodash-es'");
            }
          },
        },
        typescript({
          tsconfig: 'tsconfig.json',
          tsconfigOverride: {
            compilerOptions: {
              rootDir: join(__dirname, 'projects', 'rxutils'),
            },
          },
        }),
      ]
    },
  ];
}
