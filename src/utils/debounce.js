/**
 * 防抖函数 Debounce
 * @param {Function} func - 需要防抖的目标函数
 * @param {number} wait - 防抖等待时间（毫秒）
 * @param {boolean} immediate - 是否立即执行（true=首次触发立即执行，false=最后一次触发后执行）
 * @returns {Function} - 包装后的防抖函数
 */
function debounce(func, wait = 300, immediate = false) {
  let timeoutId = null;

  const debounced = function (...args) {
    const context = this;
    if (timeoutId) clearTimeout(timeoutId);
    if (immediate) {
      const callNow = !timeoutId;
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };

  debounced.cancel = function () {
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  return debounced;
}

export default debounce;