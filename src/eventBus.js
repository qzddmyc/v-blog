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

Vue.prototype.$bus = new Vue({});