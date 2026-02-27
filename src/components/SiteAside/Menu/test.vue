<template>
  <div class="test">
    <Menu />
  </div>
</template>

<script>
import Menu from "./";
export default {
  components: { Menu },
};
</script>

<style scoped lang="less">
.test {
  height: 200px;
  width: 300px;
  margin: 0 auto;
  padding: 300px 400px 400px;
  background-color: #202020;
  .menu-container {
    outline: 1px red solid;
  }
}
</style>