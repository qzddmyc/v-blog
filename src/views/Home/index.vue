<template>
  <div class="home-container" ref="container">
    <h1>主页</h1>
    <button @click="handleClick">弹出消息</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$showMessage({
        content: "弹出成功",
        type: "success",
        duration: 1000,
        container: this.$refs.container,
        feedback: () => {
          console.log("Finish");
        },
      });
    },
  },
};
</script>

<style>
</style>