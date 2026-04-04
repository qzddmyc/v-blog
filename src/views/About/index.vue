<template>
  <div class="about-container" v-loading.grid="isLoading || !pageLoaded">
    <iframe
      v-if="!!src"
      :src="src"
      frameborder="0"
      class="iframe"
      @load="pageLoaded = true"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      pageLoaded: false,
    };
  },
  computed: mapState("about", {
    src: "data",
    isLoading: "loading",
  }),
  created() {
    this.$store.dispatch("about/fetchAbout");
  },
};
</script>

<style lang="less" scoped>
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .iframe {
    width: 100%;
    height: 100%;
    display: block;
    box-sizing: border-box;
  }
}
</style>