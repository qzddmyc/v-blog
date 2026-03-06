<template>
  <div class="image-loager-container">
    <img v-if="showPlaceholder" :src="placeholder" class="placeholder" />
    <img
      :src="src"
      :style="{ transition: `${duration}ms` }"
      :class="{ hiding: hideReal }"
      @load="picLoaded"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideReal: true,
      showPlaceholder: true,
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  methods: {
    picLoaded() {
      this.hideReal = false;
      setTimeout(() => {
        // 这里必须使用箭头函数，否则this指向会出问题。
        this.$emit("load");
        this.showPlaceholder = false;
      }, this.duration);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";

.image-loager-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  img {
    .self-fill();
    object-fit: cover;
    &.placeholder {
      filter: blur(2vw);
    }
  }
}

.hiding {
  opacity: 0;
}
</style>