/* eslint-disable @typescript-eslint/no-var-requires */
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const path = require('path')

const productionGzipExtensions = ['js', 'css']
const resolve = (dir) => path.join(__dirname, '.', dir)
const env = process.env.NODE_ENV

const CDN = {
  css: [
    'https://unpkg.com/element-plus@2.2.9/theme-chalk/index.css'
  ],
  js: [
    'https://unpkg.com/vue@3.2.37/dist/vue.global.prod.js',
    'https://unpkg.com/vue-router@4.1.2/dist/vue-router.global.prod.js',
    'https://unpkg.com/vuex@4.0.2/dist/vuex.global.prod.js',
    'https://unpkg.com/axios@0.27.2/dist/axios.min.js',
    'https://unpkg.com/element-plus@2.2.9/dist/index.full.min.js',
  ]
}

const objExternals = {
  vue: 'Vue',
  axios: 'axios',
  vuex: 'Vuex',
  'vue-router': 'VueRouter',
  'element-plus': 'ElementPlus'
}

// 导入全局scss
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/themes/element-reset.scss'),
        path.resolve(__dirname, './src/static/styles/reset.scss')
      ]
    })
}

module.exports = {
  publicPath: '/',
  assetsDir: './assets',
  productionSourceMap: false, // 不需要生产环境的 source map
  chainWebpack: config => {
    // 全局scss
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
    // cdn
    config.plugin('html').tap(args => {
      args[0].cdn = env === 'dev' ? {} : CDN
      return args
    })
  },
  configureWebpack: {
    devServer: {
      open: true,
      port: 2222,
      host: 'localhost',
      proxy: {
        '/api': {
          target: process.env.VUE_APP_URL,
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            '^/api': '/'
          }
        }
      }
    },
    resolve: {
      extensions: ['.vue', '.ts', '.js', 'jsx', 'tsx'], // 检索文件类型
      alias: { '@': resolve('src') } // 别名
    },
    plugins: [
      // 配置compression-webpack-plugin压缩ZIP加速
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        // eslint-disable-next-line
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5 // 重复模块进行合并的最大数量
      }),
      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 10000, // 合并小于该大小的块
      }),
      // build时生成打包报告
      new BundleAnalyzer({
        analyzerMode: 'disabled', // 启用:server 不启用:disabled
        openAnalyzer: false, // 是否自动打开报告页面
        analyzerPort: 9999 // 报告页面端口
      })
    ],
    devtool: env === 'dev' ? 'eval-cheap-module-source-map' : 'nosources-source-map',
    externals: env === 'dev' ? {} : objExternals,
    cache: {
      type: 'filesystem',
      maxAge: 86400000, // 缓存一天
      buildDependencies: {
        config: [__filename]
      }
    },
    optimization: {
      nodeEnv: false // 不自动生成env文件
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@use "@/themes/element-variables.scss" as *;'
      }
    }
  }
}
