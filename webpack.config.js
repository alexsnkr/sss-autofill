const webpack = require('webpack');
const ejs = require('ejs');
const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('./package.json');

const config = {
  mode: process.env.NODE_ENV,
  context: __dirname + '/src',
  entry: {
    'background': './background.js',
    'popup/popup': './popup/popup.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  resolve: {
	alias: {
		'@': path.join(__dirname, '../src/popup')
	},
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
		  {
			  test: /\.vue$/,
			  use: {
				  loader: 'vue-loader',
				  options: {
					  extractCSS: process.env.NODE_ENV === 'production',
					  loaders: {
						  sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
						  scss: 'vue-style-loader!css-loader!sass-loader',
						  less: 'vue-style-loader!css-loader!less-loader'
					  }
				  }
			  }
		  },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
		  use: ['vue-style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.sass$/,
		  use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '/images/',
          emitFile: false,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '/fonts/',
          emitFile: false,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      global: 'window',
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
		filename: '[name].css',
    }),
    new CopyWebpackPlugin([
      { from: 'icons', to: 'icons', ignore: ['icon.ai'] },
	  { from: 'popup/popup.html', to: 'popup/popup.html', transform: transformHtml },
	  { from: 'inject', to: 'inject'},
      {
        from: 'manifest.json',
        to: 'manifest.json',
        transform: (content) => {
          const jsonContent = JSON.parse(content);
          jsonContent.version = version;

          if (config.mode === 'development') {
            jsonContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'";
          }

          return JSON.stringify(jsonContent, null, 2);
        },
      },
    ]),
  ],
};

if (config.mode === 'production') {
  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ]);
}

if (process.env.HMR === 'true') {
  config.plugins = (config.plugins || []).concat([
    new ExtensionReloader({
      manifest: __dirname + '/src/manifest.json',
    }),
  ]);
}

function transformHtml(content) {
  return ejs.render(content.toString(), {
    ...process.env,
  });
}

module.exports = config;
