<template>
  <div class="eof-container" :style="{ width: width }">
    <div class="line"></div>
    <div class="eof">EOF</div>
  </div>
</template>

<script>
export default {
  props: {
    widthPercent: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    width() {
      let width = Math.round(this.widthPercent * 100);
      width <= 0 && (width = 1);
      width > 100 && (width = 100);
      return width + "%";
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.eof-container {
  @height: 40px;
  height: @height;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  user-select: none;
  @bacc: #fff;
  .line {
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      to right,
      @gray 0%,
      @gray 70%,
      @bacc 70%,
      @bacc 100%
    );
    background-size: 10px 100%;
  }
  .eof {
    .self-center();
    height: @height;
    line-height: @height;
    width: fit-content;
    font-size: 14px;
    white-space: nowrap;
    color: darken(@gray, 20%);
    background-color: @bacc;
    padding: 0 8px;
  }
}
</style>