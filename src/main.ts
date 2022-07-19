import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import './static/font-icon/iconfont.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
