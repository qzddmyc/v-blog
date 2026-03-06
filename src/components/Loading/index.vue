<template>
  <div class="loading-container">
    <img class="loading-img" src="@/assets/loading.svg" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
// 需要父元素 position: relative;
.loading-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .loading-img {
    width: 50px;
    height: 50px;
    .self-center();
  }
}
</style>