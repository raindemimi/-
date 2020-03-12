import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '../components/login.vue'
const login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/login.vue')

// 导入home
// import home from '../components/home.vue'
const home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/home.vue')

// import welcome from '../components/welcome'
const welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/welcome.vue')

// import user from '../components/user/user.vue'
const user = () => import(/* webpackChunkName: "user" */ '../components/user/user.vue')

// import rights from '../components/power/rights.vue'
const rights = () => import(/* webpackChunkName: "rights_roles" */ '../components/power/rights.vue')

// import roles from '../components/power/roles.vue'
const roles = () => import(/* webpackChunkName: "rights_roles" */ '../components/power/roles.vue')

// import cate from '../components/goods/cate'
const cate = () => import(/* webpackChunkName: "cate_params_list_add" */ '../components/goods/cate.vue')

// import params from '../components/goods/params'
const params = () => import(/* webpackChunkName: "cate_params_list_add" */ '../components/goods/params.vue')

// import list from '../components/goods/list'
const list = () => import(/* webpackChunkName: "cate_params_list_add" */ '../components/goods/list.vue')

// import add from '../components/goods/add'
const add = () => import(/* webpackChunkName: "cate_params_list_add" */ '../components/goods/add.vue')

// import order from '../components/order/order'
const order = () => import(/* webpackChunkName: "order" */ '../components/order/order.vue')

// import report from '../components/report/report'
const report = () => import(/* webpackChunkName: "report" */ '../components/report/report.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  {
    path: '/home',
    component: home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: welcome },
      { path: '/users', component: user },
      { path: '/rights', component: rights },
      { path: '/roles', component: roles },
      { path: '/categories', component: cate },
      { path: '/params', component: params },
      { path: '/goods', component: list },
      { path: '/goods/add', component: add },
      { path: '/orders', component: order },
      { path: '/reports', component: report }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
