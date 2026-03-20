// const listeners = {};

// // 事件总线
// export default {
//   // 监听事件
//   $on(event, handler) {
//     !listeners[event] && (listeners[event] = new Set());
//     listeners[event].add(handler);
//   },
//   // 取消监听
//   $off(event, handler) {
//     if (!listeners[event]) return;
//     listeners[event].delete(handler);
//   },
//   // 触发事件
//   $emit(event, ...args) {
//     if (!listeners[event]) return;
//     listeners[event].forEach(handler => {
//       typeof handler === 'function' && handler(...args);
//     });
//   }
// }

import Vue from "vue";

/**
 * mainScroll: 主区域滚动时触发
 *  - 触发者为 @/views/Blog/Detail.vue 与 @/views/Blog/components/BlogList.vue
 *  - 参数为触发滚动的 DOM 元素；会在该元素被销毁前，使用 null 进行一次事件触发
 * setScroll: 需要设置滚动区域的滚动高度时触发
 *  - 触发者为 @/components/ToTop/index.vue
 *  - 参数为需要设定的高度，Number 类型
 */
Vue.prototype.$bus = new Vue({});