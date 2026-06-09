const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function (_, argv) {
  const isProduction = argv.mode === 'production'

  return {
    mode: isProduction ? 'production' : 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'noty.js',
      library: {
        name: 'Noty',
        type: 'umd',
        export: 'default'
      },
      globalObject: 'this',
      clean: true
    },
    resolve: {
      extensions: ['.js', '.scss'],
      alias: {
        api: path.resolve(__dirname, 'src/api.js'),
        utils: path.resolve(__dirname, 'src/utils.js'),
        'noty.scss': path.resolve(__dirname, 'src/noty.scss')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false
                  }
                ]
              ]
            }
          }
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'src'),
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'noty.css'
      })
    ],
    optimization: {
      minimize: isProduction
    },
    devtool: isProduction ? false : 'source-map',
  }
}
