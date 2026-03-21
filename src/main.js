import "./mock";
import Vue from 'vue';
import App from './App.vue';
import "./styles/global.less";
import router from './router';
import './eventBus';

import { showMessage, debounce } from './utils';
Vue.prototype.$showMessage = showMessage;
Vue.prototype.$debounce = debounce;

import vLoading from './directives/loading';
import vLazy from './directives/lazy';
Vue.directive('loading', vLoading);
Vue.directive('lazy', vLazy);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
