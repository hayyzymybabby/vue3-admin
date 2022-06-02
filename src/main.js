import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/i18n'
import installElementPlus from './plugins/element'
// 导入全局样式
import './styles/index.scss'
// 导入 SvgIcon
import installIcons from './icons'
// 导入路由鉴权
import './permission'
// filter
import installFilter from '@/filters'
// directives
import installDirective from '@/directives'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)
app.use(store).use(router).use(i18n).mount('#app')
