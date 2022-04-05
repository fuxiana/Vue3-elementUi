import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import { toLine } from './utils'

const app = createApp(App)

for (const key in Icons) {
   app.component(`el-icon-${toLine(key)}`,(Icons as any)[key])
}

app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')