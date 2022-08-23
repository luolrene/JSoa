// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import Fragment from 'vue-fragment'
import layer from 'vue-layer'
import popWinSize from './utils/layerSize'
import share from './utils/eval'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import Print from 'vue-printjs'

import 'vue-layer/lib/vue-layer.css'
import './permission'
import './utils/components'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/common.css'
// require('./mock/mock')

axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.component(VueQrcode.name, VueQrcode)

Vue.prototype.$layer = layer(Vue)
Vue.prototype.$layer_Size = popWinSize
Vue.prototype.$share = share
Vue.prototype.$bus = new Vue()

Vue.use(ElementUI, { size: 'small' });
Vue.use(Fragment.Plugin)
Vue.use(Print)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
// process是Node环境全部变量, 运行时根据敲击的命令不同, 脚手架会取环境变量给env添加属性和值
if (process.env.NODE_ENV !== 'development') {
  console.log = function () { }
  console.error = function () { }
  console.dir = function () { }
}
