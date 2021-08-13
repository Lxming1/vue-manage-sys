import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('./views/Login')
const home = () => import('./views/Home')
const welcome = () => import('./views/Welcome')

const user = () => import('./components/user/user/User')

const roles = () => import('./components/roles/roles/Roles')
const rights = () => import('./components/roles/rights/Rights')

const goods = () => import('./components/goods/goods/Goods')
const params = () => import('./components/goods/params/Params')
const categories = () => import('./components/goods/categories/Categories')

const orders = () => import('./components/orders/Orders')

const reports = () => import('./components/reports/Reports')

Vue.use(Router)

const children = [{
  path: '/welcome',
  component: welcome
}, {
  path: '/users',
  component: user
}, {
  path: '/roles',
  component: roles
}, {
  path: '/rights',
  component: rights
}, {
  path: '/goods',
  component: goods
}, {
  path: '/params',
  component: params
}, {
  path: '/categories',
  component: categories
}, {
  path: '/orders',
  component: orders
}, {
  path: '/reports',
  component: reports
}]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home,
      redirect: '/welcome',
      children
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
