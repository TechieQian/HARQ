const path = require('path');
module.exports = {
	entry: './client/Index.jsx',
	output: {
		path: __dirname,
		filename: './public/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'react', 'stage-2']
        }
      }
    ]
  }
};
