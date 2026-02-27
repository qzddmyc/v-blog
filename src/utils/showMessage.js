import getComponentRootDom from './getComponentRootDom';
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";

/**
 * 弹出消息
 * @param {Object} userOptions 用户配置
 * @param {String} userOptions.content 消息内容
 * @param {String} userOptions.type 消息类型 info error success warn
 * @param {Number} userOptions.duration 多久后消失，单位为毫秒
 * @param {HTMLElement} userOptions.container 容器，消息会显示到容器的正中，不传则显示到页面正中
 * @param {Function} userOptions.feedback 回调函数，指弹窗消失时调用的函数
 */
function showMessage(userOptions = {}) {
  const options = {
    content: '',
    type: 'info',
    duration: 2000,
    container: document.body,
    ...userOptions,
  };

  const div = document.createElement('div');
  const iconDom = getComponentRootDom(Icon, { type: options.type });
  div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${options.content}</div>`;
  div.classList.add(styles.message, styles.hideFirst, styles[`message-${options.type}`]);

  if (options.container !== document.body && getComputedStyle(options.container).position === "static") {
    options.container.style.position = "relative";
  }

  options.container.appendChild(div);
  div.clientHeight; // 强制reflow
  div.classList.remove(styles.hideFirst);

  setTimeout(() => {
    div.classList.add(styles.hideEnd);
    div.addEventListener('transitionend', () => {
      div.remove();
      options.feedback && options.feedback();
    }, { once: true });
  }, options.duration);
}

export default showMessage;