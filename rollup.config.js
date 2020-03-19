import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import { merge } from 'lodash';

const pkg = require('./package.json');

function genCfg(options){
  return merge({
    output: {
      file: 'build/es/index.js',
      format: 'es',
      name: 'index',
      sourcemap: false
    },
    // 指出应将哪些模块视为外部模块
    external: id => {
      return /^utils-\//i.test(id);
    },
    plugins: [
      replace({
        __VERSION__: pkg.version
      }),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-env', {
            modules: false
          }]
        ],
        plugins: [
          '@babel/plugin-proposal-object-rest-spread'
        ]
      })
    ]
  }, options);
}

export default [
  genCfg({
    input: 'src/index.js',
    output: {
      file: 'build/es/index.js',
      name: 'url',
    }
  })
]
