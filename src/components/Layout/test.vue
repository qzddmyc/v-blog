<template>
  <div class="test">
    <Layout>
      <template #left>
        <div class="l">左边栏区域，宽度适应内容，溢出隐藏</div>
      </template>
      <div class="m">主区域，宽度占满剩余空间，溢出隐藏</div>
      <template #right>
        <div class="r">右边栏区域，宽度适应内容，溢出隐藏</div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./";

export default {
  components: { Layout },
};
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
.test {
  width: 100%;
  height: 100vh;
  .l {
    width: 288px;
    height: 100%;
  }
  .m {
    width: 100%;
    height: 100%;
    background-color: lightblue;
  }
  .r {
    width: 240px;
    height: 100%;
    background-color: #ccc;
  }
}
</style>