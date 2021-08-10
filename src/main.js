// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import global_ from './global.js'
import store from '@/store'
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$global = global_ // 挂载到Vue实例上面
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
