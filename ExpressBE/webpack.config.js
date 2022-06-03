const path = require('path');

module.exports = {
  entry: './ts_webpack/public/js/databasehandle.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'databasehandle.js',
    path: path.resolve(__dirname, './build/public/js'),
  },
};
