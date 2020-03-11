import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
// 导入home
import home from '../components/home.vue'
import welcome from '../components/welcome'
import user from '../components/user/user.vue'
import rights from '../components/power/rights.vue'
import roles from '../components/power/roles.vue'
import cate from '../components/goods/cate'
import params from '../components/goods/params'
import list from '../components/goods/list'
import add from '../components/goods/add'
import order from '../components/order/order'

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
      { path: '/orders', component: order }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
