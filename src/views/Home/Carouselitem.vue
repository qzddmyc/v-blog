<template>
  <div class="carousel-item-container">
    <div class="carousel-img">
      <ImageLoader
        :placeholder="carousel.midImg"
        :src="carousel.bigImg"
        @load="initAndShowContent"
      />
    </div>
    <div class="carousel-content-container">
      <div class="title" ref="title">{{ carousel.title }}</div>
      <div class="description" ref="desc">{{ carousel.description }}</div>
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  components: { ImageLoader },
  props: ["carousel", "idxOfThis", "CurrentShowingIdx"],
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      imgLoaded: false,
      timeoutId: null,
    };
  },
  computed: {
    shouldShowContent() {
      return this.idxOfThis === this.CurrentShowingIdx;
    },
  },
  beforeDestroy() {
    this.timeoutId && clearTimeout(this.timeoutId);
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
  .carousel-img {
    width: 100%;
    height: 100%;
  }
  .carousel-content-container {
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