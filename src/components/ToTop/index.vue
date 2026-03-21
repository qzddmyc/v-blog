<template>
  <div
    class="to-top-container"
    :class="{ hide: !show, rmTransition: !needTransition }"
    @click="handleClick"
  >
    TOP
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      needTransition: true,
    };
  },
  methods: {
    handleScroll(dom) {
      if (!dom) {
        this.needTransition = false;
        this.show = false;
      } else {
        this.needTransition = true;
        this.show = dom.scrollTop >= 1000;
      }
    },
    handleClick() {
      this.$bus.$emit("setScroll", 0);
    },
  },
  mounted() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.to-top-container {
  position: fixed;
  @gap: 50px;
  right: @gap;
  bottom: @gap;
  background-color: @primary;
  color: #fff;
  border-radius: 50%;
  @size: 50px;
  height: @size;
  width: @size;
  line-height: @size;
  text-align: center;
  cursor: pointer;
  user-select: none;
  transition: 0.3s linear;
  font-size: 15px;
  &.hide {
    bottom: -@gap * 2;
  }
  &.rmTransition {
    transition: none;
  }
}
</style>