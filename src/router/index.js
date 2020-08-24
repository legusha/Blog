import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import middleware from '@/router/middleware'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/posts/1'
  },
  {
    path: '/posts',
    redirect: '/posts/1'
  },
  {
    path: '/posts/:page',
    name: 'Posts',
    props: true,
    component: () => import(/* webpackChunkName: "posts" */ '@/views/Posts')
  },
  {
    path: '/post/edit/:id',
    name: 'Post-edit',
    props: true,
    component: () => import(/* webpackChunkName: "post-action" */ '@/views/Post-action'),
    beforeEnter: middleware.postEdit.bind(middleware, store)
  },
  {
    path: '/post/create',
    name: 'Post-create',
    props: true,
    component: () => import(/* webpackChunkName: "post-action" */ '@/views/Post-action'),
    beforeEnter: middleware.postCreate.bind(middleware, store)
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
