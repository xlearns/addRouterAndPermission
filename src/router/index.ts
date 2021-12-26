import {createRouter,createWebHashHistory} from 'vue-router'
import {beforeEach} from './addRoute'
const routes = []

//静态路由
routes.push(
   {
    path: '/',
    name: 'index',
    redirect:'/test',
    component: () => import('@/views/test.vue') 
   },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test.vue') 
  }
)

const router = createRouter({
    // 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {top: 0}
      }
    },
    // history: createWebHistory(), // 路由的history模式
    history: createWebHashHistory(),
    routes
})

beforeEach(router)

export default router