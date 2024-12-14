import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Particles from 'particles.vue3';


import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons-vue";
import { toLine } from "./utils";


const app = createApp(App);

for (const key in Icons) {
  app.component(`el-icon-${toLine(key)}`, (Icons as any)[key]);
}



app.use(ElementPlus);
// app.use(Container)
app.use(Particles)
app.use(router);
app.use(store);
// 添加到vue对象上，可以在全局通过 this.$cookies来调用
app.mount("#app");
