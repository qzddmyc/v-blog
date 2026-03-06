<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="carousel-img" :style="imgPosition" ref="image">
      <ImageLoader
        :placeholder="carousel.midImg"
        :src="carousel.bigImg"
        @load="initAndShowContent"
      />
    </div>
    <div class="carousel-content">
      <div class="title" ref="title">{{ carousel.title }}</div>
      <div class="description" ref="desc">{{ carousel.description }}</div>
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  components: { ImageLoader },
  props: ["carousel", "idxOfThis", "currentShowingIdx", "inTransition"],
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      imgLoaded: false,
      timeoutId: null,
      containerSize: { width: 0, height: 0 }, // $refs.container 尺寸
      innerSize: { width: 0, height: 0 }, // $refs.image 尺寸
      mousePosition: { x: 0, y: 0 }, // 鼠标相对容器的坐标
      containerPosition: { x: 0, y: 0 }, // $refs.container 在页面中的位置
    };
  },
  computed: {
    shouldShowContent() {
      return this.idxOfThis === this.currentShowingIdx;
    },
    imgPosition() {
      const extraWidth = this.innerSize.width - this.containerSize.width;
      const extraHeight = this.innerSize.height - this.containerSize.height;
      const left =
        (-extraWidth / this.containerSize.width) * this.mousePosition.x;
      const top =
        (-extraHeight / this.containerSize.height) * this.mousePosition.y;
      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    centerPosition() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    this.refreshSize();
    window.addEventListener("resize", this.refreshSize);
    this._putTheMouseMid();
  },
  beforeDestroy() {
    this.timeoutId && clearTimeout(this.timeoutId);
    window.removeEventListener("resize", this.refreshSize);
  },
  watch: {
    shouldShowContent(shouldShow, _) {
      if (!this.imgLoaded) return;
      this.timeoutId && clearTimeout(this.timeoutId);
      if (shouldShow) {
        this.timeoutId = setTimeout(() => {
          this._show();
          this.timeoutId = null;
        }, 300);
      } else {
        this.timeoutId = setTimeout(() => {
          this._hide();
          this.timeoutId = null;
        }, 150);
      }
    },
    inTransition(isTransitioningNow) {
      if (!isTransitioningNow) this.refreshSize();
    },
  },
  methods: {
    initAndShowContent() {
      this.titleWidth = this.$refs.title.clientWidth;
      this.descWidth = this.$refs.desc.clientWidth;
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.imgLoaded = true;
      if (!this.shouldShowContent) return;
      this.$refs.title.clientWidth;
      this.$refs.desc.clientWidth;
      this._show();
    },
    _show() {
      this.$refs.title.style.transition = "1s";
      this.$refs.desc.style.transition = "2s 1s";
      this.$refs.title.style.width = this.titleWidth + "px";
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    _hide() {
      this.$refs.title.style.transition = "";
      this.$refs.desc.style.transition = "";
      this.$refs.title.style.width = 0;
      this.$refs.desc.style.width = 0;
    },
    refreshSize() {
      this.containerSize.width = this.$refs.container.clientWidth;
      this.containerSize.height = this.$refs.container.clientHeight;
      this.innerSize.width = this.$refs.image.clientWidth;
      this.innerSize.height = this.$refs.image.clientHeight;
      const rect = this.$refs.container.getBoundingClientRect();
      this.containerPosition.x = rect.left;
      this.containerPosition.y = rect.top;
    },
    handleMouseMove(e) {
      if (!this.shouldShowContent || this.inTransition) return;
      this.mousePosition.x = e.clientX - this.containerPosition.x;
      this.mousePosition.y = e.clientY - this.containerPosition.y;
    },
    handleMouseLeave() {
      this._putTheMouseMid();
    },
    _putTheMouseMid() {
      this.mousePosition.x = this.centerPosition.x;
      this.mousePosition.y = this.centerPosition.y;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";

.carousel-item-container {
  width: 100%;
  height: 100%;
  color: #fff;
  background-color: @dark;
  position: relative;
  overflow: hidden;
  .carousel-img {
    @enlargement-factor: 108%;
    width: @enlargement-factor;
    height: @enlargement-factor;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.3s;
  }
  .carousel-content {
    .self-center();
    transform: translateY(-50%);
    left: ~"max(5%, 30px)";
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    letter-spacing: 3px;
    white-space: nowrap;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    .title,
    .description {
      overflow: hidden;
      opacity: 0;
    }
    .title {
      font-size: 2rem;
      margin-bottom: 18px;
      color: lighten(@gray, 20%);
    }
    .description {
      font-size: 1.2em;
    }
  }
}
</style>