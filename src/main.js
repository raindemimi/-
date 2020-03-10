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
// require styles 导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 配置axios
import axios from 'axios'
// 请求的根路径
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
