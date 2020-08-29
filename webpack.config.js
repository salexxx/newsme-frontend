const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const cssnano = require('cssnano');

module.exports = {
  entry: {
    main: './src/js/index.js',
    articles: './src/js/articles/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: { loader: 'babel-loader' },
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        },
        'css-loader',
        'postcss-loader',
      ],
    },
    {
      test: /\.(png|jpe?g|svg|gif|ico)$/,
      use: [
        { loader: 'file-loader?name=./images/[name].[ext]' },
        {
          loader: 'image-webpack-loader',
          options: {},
        },
      ],
      exclude: /node_modules/,
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      use: { loader: 'file-loader?name=./vendor/[name].[ext]' },
    },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/style.[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/pages/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/pages/articles.html',
      filename: 'articles.html',
      chunks: ['articles'],
    }),
    new WebpackMd5Hash(),
  ],
};
