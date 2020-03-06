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
// console.log(axios)
// 通过 axios 请求拦截器添加 token，保证拥有获取数据的权限
axios.interceptors.request.use(config => {
  // 为请求头字段，添加 Authorization 属性，并且值为 token 值
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须 return
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
