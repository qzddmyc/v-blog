import "./mock";
import Vue from 'vue';
import App from './App.vue';
import "./styles/global.less";
import router from './router';
import store from "./store";
import './eventBus';
import { titleController } from './utils';

import { showMessage, debounce } from './utils';
Vue.prototype.$showMessage = showMessage;
Vue.prototype.$debounce = debounce;

import vLoading from './directives/loading';
import vLazy from './directives/lazy';
Vue.directive('loading', vLoading);
Vue.directive('lazy', vLazy);

titleController.init();
store.dispatch("setting/fetchSetting");

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
