import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import '@/assets/styles/reset.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
