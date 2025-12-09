const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name].[contenthash][ext]',
    publicPath: './', 
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
        generator: {
          filename:'assets/[name].[contenthash][ext]' },
       
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      scriptLoading: 'defer', 
      minify: true,
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: 'src/assets', 
          to: 'assets',
          globOptions: {
            ignore: ['**/*.scss', '**/*.js'] 
          }
        },
      ],
    }),

  ],
  
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true, 
  },
};

