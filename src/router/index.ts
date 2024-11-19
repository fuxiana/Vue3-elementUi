import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'
import Purchase from '../../src/views/purchase/index.vue'
import Form from '../views/form/index.vue';
import QrCode from '../views/qrcode/index.vue';
import BarCode from '../views/bar-code/index.vue';
import JsonEditor from '../views/json-editor/index.vue';
import Register from '../views/home/register.vue'
 
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // component: Container,
    name:'container_header',
    children:[
      {
        path: '/',
        name: '登入',
        component: Home,
      },
      {
        path: '/register',
        name: '注册',
        component: Register,
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
      },
      {
        path: '/qrcode',
        name: '二维码',
        component: QrCode,
      },
      {
        path: '/bar-code',
        name: '条形码',
        component: BarCode,
      },
      {
        path: '/json-editor',
        name: 'JSON数据格式在线格式化',
        component: JsonEditor,
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

let shouldShowMenu = true;

router.beforeEach((to: any, from: any, next: Function) => {
  // 判断当前路由是否为不展示菜单的路由
  if (to.name === '/' ) {
    shouldShowMenu = false; // 不显示菜单
  } else {
    shouldShowMenu = true; // 显示菜单
  }
  next();
});


export default router
