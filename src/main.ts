import {createApp} from 'vue';
import App from './App.vue';
import router from './router/index'; //引入vue-router
import 'element-plus/es/components/message/style/css'
import 'element-plus/theme-chalk/el-loading.css'
import './index.scss';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
const app = createApp(App);
app.use(router); // 挂载到app上
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app');