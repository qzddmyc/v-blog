import "./mock";
import Vue from 'vue';
import App from './App.vue';
import "./styles/global.less";
import router from './router';

import { showMessage, debounce } from './utils';
Vue.prototype.$showMessage = showMessage;
Vue.prototype.$debounce = debounce;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
