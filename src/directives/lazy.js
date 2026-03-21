import eventBus from "@/eventBus";
import { debounce } from "@/utils";
import defaultGif from "@/assets/default.gif";

let imgs = [];

function setImage(obj) {
  !obj.dom.src && (obj.dom.src = defaultGif);
  const viewHeight = document.documentElement.clientHeight;
  const rect = obj.locationNode?.getBoundingClientRect() || obj.dom.getBoundingClientRect();
  if (rect.bottom >= 0 && rect.top <= viewHeight) {
    imgs = imgs.filter((o) => o !== obj);
    const tmpImg = new Image();
    tmpImg.onload = () => { obj.dom.src = obj.src };
    tmpImg.src = obj.src;
  }
}

function setImages() {
  imgs.forEach((i) => setImage(i));
}

function handleScroll() {
  setImages();
}

eventBus.$on("mainScroll", debounce(handleScroll, 50));

export default {
  inserted(el, binding) {
    const _obj = {
      dom: el,
      src: binding.value.src,
      locationNode: Array.from({ length: binding.value.relation }).reduce((node) => node?.parentElement, el),
    };
    imgs.push(_obj);
    setImage(_obj);
  },
  unbind(el) {
    imgs = imgs.filter((obj) => obj.dom !== el);
  }
}