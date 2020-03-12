import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入图标库
import './assets/fonts/iconfont.css'
// 导入全局样式
import './assets/css/global.css'
import treeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'

// 配置axios
import axios from 'axios'
// 请求的根路径
axios.defaults.baseURL = '/api'

// console.log(axios)
// 通过 axios 请求拦截器添加 token，保证拥有获取数据的权限
// request 时，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  // const api = '/api/'
  // config.url = api + config.url
  NProgress.start()
  // 为请求头字段，添加 Authorization 属性，并且值为 token 值
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须 return
  return config
}, err => {
  return Promise.reject(err)
})
// Response 时，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
}, err => {
  return Promise.reject(err)
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('tree-table', treeTable)
// 定义富文本编辑器的组件
Vue.use(VueQuillEditor)
// 定义过滤器
Vue.filter('dateFormat', function (date) {
  const dt = new Date(date)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1).toString().padStart(2, '0')
  const d = (dt.getDate()).toString().padStart(2, '0')
  const hh = (dt.getHours()).toString().padStart(2, '0')
  const mm = (dt.getMinutes()).toString().padStart(2, '0')
  const ss = (dt.getSeconds()).toString().padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
