import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'
import Container  from  '../components/container/src/index.vue'
import Purchase from '../../src/views/purchase/index.vue'
import Form from '../views/form/index.vue'
 
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Container,
    name:'container_header',
    children:[
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/purchase',
        name: 'Purchase',
        component: Purchase,
      },
      {
        path: '/form',
        name: 'Form',
        component: Form,
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
