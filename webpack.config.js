const fs = require('fs')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')

const themesPath = path.resolve(__dirname, 'src/themes')

const themeEntries = fs
  .readdirSync(themesPath)
  .reduce((entries, file) => {
    const name = path.basename(file, '.scss')

    entries[`themes/${name}`] = path.resolve(themesPath, file)

    return entries
  }, {})

module.exports = function (_, argv) {
  const isProduction = argv.mode === 'production'

  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      noty: path.resolve(__dirname, 'src/index.js'),
      ...themeEntries
    },
    output: {
      path: path.resolve(__dirname, 'demo/lib'),
      filename: '[name].js',
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
      new RemoveEmptyScriptsPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ],
    optimization: {
      minimize: isProduction
    },
    devtool: isProduction ? false : 'source-map'
  }
}
