import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home/index.vue";
import Container from "../components/container/src/index.vue";
import Purchase from "../../src/views/purchase/index.vue";
import Form from "../views/form/index.vue";
import QrCode from "../views/qrcode/index.vue";
import BarCode from "../views/bar-code/index.vue";
import JsonEditor from "../views/json-editor/index.vue";
import Register from "../views/home/register.vue";
import Interview from "../views/interview/index.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Container,
    name: "container_header",
    meta: {
      title: "登入",
    },
    children: [
      {
        path: "/",
        name: "登入",
        component: Home,
        meta: {
          title: "登入",
        },
      },
      {
        path: "/register",
        name: "注册",
        component: Register,
        meta: {
          title: "注册",
        },
      },
      {
        path: "/purchase",
        name: "Purchase",
        component: Purchase,
      },
      {
        path: "/form",
        name: "Form",
        component: Form,
      },
      {
        path: "/interview",
        name: "面试题",
        component: Interview,
      },
      {
        path: "/qrcode",
        name: "二维码",
        component: QrCode,
      },
      {
        path: "/bar-code",
        name: "条形码",
        component: BarCode,
      },
      {
        path: "/json-editor",
        name: "JSON数据格式在线格式化",
        component: JsonEditor,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
