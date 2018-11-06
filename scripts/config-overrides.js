const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired")
const rewireLess = require('react-app-rewire-less')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const merge = require('webpack-merge')

module.exports = function override(config, env) {
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  )

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [
        tsImportPluginFactory({
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
          style: true
        })
      ]
    })
  }

   config = rewireLess.withLoaderOptions({
     javascriptEnabled: true,
     modifyVars: { "@primary-color": "#1DA57A" }
   })(config, env)

  return merge(config, {
    plugins: [
      new StylelintWebpackPlugin({
        files: ['src/**/*.less']
      })
    ]
  })
}
