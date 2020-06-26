const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: resolve(__dirname,'src/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          { loader: 'react-hot-loader/webpack' },
          // { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.svg$/,
            // loader: 'svg-inline-loader'
            use: [
              {
                loader: 'svg-url-loader',
                options: {
                  limit: 10000,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    // watchContentBase: true,
    // watchOptions: {
    //   poll:true
    // },
    // inline: true,
    hot: true,
    // host: '0.0.0.0',
    port: '3000',
    open: true,
    historyApiFallback: true
  },
  devtool: 'eval-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}