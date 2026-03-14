import { getComponentRootDom } from '@/utils';
import Loading from '@/components/Loading';
import LoadingDomino from '@/components/Loading/Domino';
import LoadingSwing from '@/components/Loading/Swing';
import LoadingDots from '@/components/Loading/Dots';
import LoadingGrid from '@/components/Loading/Grid';
import LoadingDrop from '@/components/Loading/Drop';

function getExistedLoadingDom(el) {
  const d = el.querySelector("[data-role='loading']");
  return d || null;
}

function createLoading(params) {
  let dom;
  if (params.domino) dom = getComponentRootDom(LoadingDomino, {});
  else if (params.swing) dom = getComponentRootDom(LoadingSwing, {});
  else if (params.dots) dom = getComponentRootDom(LoadingDots, {});
  else if (params.grid) dom = getComponentRootDom(LoadingGrid, {});
  else if (params.drop) dom = getComponentRootDom(LoadingDrop, {});
  else dom = getComponentRootDom(Loading, {});
  dom.dataset.role = "loading";
  return dom;
}

function updateStatus(el, binding) {
  const existedLoadingDom = getExistedLoadingDom(el);
  if (binding.value) {
    if (existedLoadingDom) return;
    const d = createLoading(binding.modifiers);
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