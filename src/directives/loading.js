import { getComponentRootDom } from '@/utils';
import Loading from '@/components/Loading';

function getExistedLoadingDom(el) {
  const d = el.querySelector("[data-role='loading']");
  return d || null;
}

function createLoading() {
  const dom = getComponentRootDom(Loading, {});
  dom.dataset.role = "loading";
  return dom;
}

function updateStatus(el, binding) {
  const existedLoadingDom = getExistedLoadingDom(el);
  if (binding.value) {
    if (existedLoadingDom) return;
    const d = createLoading();
    el.appendChild(d);
  } else {
    existedLoadingDom && existedLoadingDom.remove();
  }
}

// 导出指令的配置对象
export default {
  bind(...args) {
    updateStatus(...args);
  },
  inserted(el) {
    if (el && getComputedStyle(el).position === "static") {
      el.style.position = 'relative';
    }
  },
  update(el, binding) {
    binding.value !== binding.oldValue && updateStatus(el, binding);
  }
}