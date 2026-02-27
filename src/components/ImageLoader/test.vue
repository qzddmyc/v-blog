<template>
  <ImageLoader
    src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
    placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
    :duration="3000"
    @load="handler"
  />
</template>

<script>
import ImageLoader from "./";
export default {
  components: { ImageLoader },
  methods: {
    handler() {
      console.log("Img loaded.");
    },
  },
};
</script>

<style scoped lang="less">
.image-loager-container {
  width: 80%;
  height: 80vh;
  border: 2px solid;
  margin: 0 auto;
}
</style>