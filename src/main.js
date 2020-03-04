import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入图标库
import './assets/fonts/iconfont.css'
// 导入全局样式
import './assets/css/global.css'

// 配置axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// console.log(Vue.propotype.$http)
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
