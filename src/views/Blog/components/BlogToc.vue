<template>
  <div class="blog-toc-container" v-loading="!toc.length">
    <div class="inner-container" v-show="!!toc.length">
      <h2>目录</h2>
      <div class="nav-tree-fix-container">
        <div class="nav-tree-scroll-container">
          <NavTree :list="toc" @select="handleSelect" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTree from "./NavTree.vue";
export default {
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },
  components: { NavTree },
  methods:{
    handleSelect(tar){
      location.hash = tar.anchor;
      
    }
  }
};
</script>

<style lang="less" scoped>
.blog-toc-container {
  width: 250px;
  height: 100%;
  box-sizing: border-box;
  @toc-gap: 20px;
  padding-top: @toc-gap;
  padding-left: @toc-gap;
  position: relative;
  .inner-container {
    width: 100%;
    height: 100%;
    @h2-height: 27px;
    h2 {
      font-weight: bold;
      letter-spacing: 2px;
      font-size: 1.2em;
      margin: 0;
      height: @h2-height;
    }
    .nav-tree-fix-container {
      height: calc(100% - @h2-height - @toc-gap * 2);
      width: 100%;
      margin-top: @toc-gap;
      margin-bottom: @toc-gap;
      box-sizing: border-box;
      overflow: hidden;
      .nav-tree-scroll-container {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }
}
</style>