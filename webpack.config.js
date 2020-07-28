const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    // 'webpack-dev-server/client?http://0.0.0.0:8080/',
    // 'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/index.ts'),
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: ['awesome-typescript-loader', 'tslint-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          // {
          //   // creates style nodes from JS strings
          //   loader: 'style-loader',
          // },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'src'),
            },
          },
          {
            // translates CSS into CommonJS
            loader: 'css-loader',
          },
          {
            // compiles Sass to CSS
            loader: 'sass-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // eslint-disable-next-line global-require
                require('autoprefixer'),
              ],
            },
          },
        ],
      },
      // {
      //   test: /\.less$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader', 'less-loader'],
      //   }),
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       // creates style nodes from JS strings
      //       loader: 'style-loader',
      //     },
      //     {
      //       // translates CSS into CommonJS
      //       loader: 'css-loader',
      //     },
      //   ],
      // },
      // {
      //   test: /\.svg/,
      //   use: {
      //     loader: 'svg-url-loader',
      //   },
      // },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //     },
      //   ],
      // },
    ],
  },
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.html'] },
  output: {
    // path: `${__dirname}/dist`,
    filename: 'app.js',
    // publicPath: '/hmr/',
  },
  devtool: 'source-map',
  optimization: {
    // runtimeChunk: {
    //     name: 'common',
    // },
    minimize: true,
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    watchContentBase: true,
    disableHostCheck: true,
    host: '127.0.0.1',
    port: 3000,
    publicPath: '/hmr/',
    filename: 'app.js',
    open: true,
    inline: true,
    hot: true,
    // hotOnly: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new ExtractTextPlugin('style.css'),
  ],
};
