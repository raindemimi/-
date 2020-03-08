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
      { path: '/categories', component: cate }
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
