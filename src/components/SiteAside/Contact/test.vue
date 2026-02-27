<template>
  <div class="test">
    <Contact />
  </div>
</template>

<script>
import Contact from "./";
export default {
  components: { Contact },
};
</script>

<style scoped lang="less">
.test {
  height: 400px;
  width: 300px;
  // border: 1px solid red;
  margin: 0 auto;
  padding: 300px 400px 0;
  background-color: #202020;
}
</style>