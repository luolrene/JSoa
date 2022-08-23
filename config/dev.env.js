'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  // BASE_API: '"http://192.168.2.254:8080"',  //测试服务器
   BASE_API: '"http://192.168.2.30:8081"',
  // BASE_API: '"http://47.108.56.178:8081"', //九升公司服务器
  // BASE_API: '"http://47.108.227.22:8081"',  //生产环境

  JS_Server: '"/JSOA"',
  FILE_Server: '"http://192.168.2.254:8012/onlinePreview?url="',

  NODE_ENV: '"development"'
})
