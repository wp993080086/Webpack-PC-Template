/* eslint-disable */
import { baseRouter } from '@/config'

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: 'not-found' */ '@/pages/base/not-found/index'),
    meta: {
      title: 'NotFound',
      showHeader: false
    }
  },
  {
    path: baseRouter.LOGIN,
    name: 'Login',
    component: () => import(/* webpackChunkName: 'login' */ '@/pages/base/login/index.vue'),
    meta: {
      title: '登录',
      showHeader: false
    }
  }
]
