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
    if (el && getComputedStyle(el).position === "static") {
      el.style.position = 'relative';
    }
    const d = createLoading();
    el.appendChild(d);
  } else {
    existedLoadingDom && existedLoadingDom.remove();
  }
}

// 导出指令的配置对象
export default {
  inserted(...args) {
    updateStatus(...args);
  },
  update(...args) {
    updateStatus(...args)
  }
}