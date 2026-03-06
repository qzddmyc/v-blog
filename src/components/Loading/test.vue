<template>
  <div class="container">
    <Loading v-show="isLoading" />
    <button @click="isLoading = !isLoading">切换</button>
  </div>
</template>

<script>
import Loading from "./";
export default {
  components: { Loading },
  data() {
    return {
      isLoading: true,
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 200px;
  height: 200px;
  outline: 1px solid #008c8c;
  margin: 0 auto;
  margin-top: 100px;
  position: relative;
  button {
    position: absolute;
    bottom: 0;
  }
}
</style>