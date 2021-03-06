'use strict';
const ip = require('ip');
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const isProd = process.env.NODE_ENV != 'development';

module.exports = {
  context: __dirname,
  devtool: isProd ? 'cheap-module-source-map':'source-map', //cheap-module-eval-source-map
  // devtool: false,
  entry: {
    'demo/index': './demo/index.js',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: pkg.name,
    libraryExport: 'default',
    umdNamedDefine: true,
  },
  stats: {
    modules: false,
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules|assembly/,
        enforce: 'pre',
        use: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                ['@babel/plugin-transform-runtime', {
                  // 开启后，关闭commonjs方式，以esm方式引入helpers函数
                  // useESModules: true,  //默认false
                }],
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-class-properties'
              ],
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  watchOptions: {
    ignored: /node_modules/,
    // poll: 1000
  },
  devServer: {
    //允许手机绑定本地代理服务后访问，
    host: `${ip.address()}`,
    contentBase: [
      'dist',
      'demo',
    ],
    hot: true
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: ['node_modules'],
    mainFields:['module', 'main'],
    alias: {
      'js-utils-url': path.resolve('./src/index')
    }
  }
};