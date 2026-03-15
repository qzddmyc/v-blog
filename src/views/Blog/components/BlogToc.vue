<template>
  <div class="blog-toc-container" v-loading.dots="!toc.length">
    <div class="inner-container" v-show="!!toc.length">
      <h2>目录</h2>
      <div class="nav-tree-fix-container">
        <div class="nav-tree-scroll-container">
          <NavTree :list="tocWithSelect" @select="handleSelect" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTree from "./NavTree.vue";
import { debounce } from "@/utils";
export default {
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedAnchor: "",
      commentDom: null,
      debouncedSetSelect: () => {},
    };
  },
  components: { NavTree },
  created() {
    this.debouncedSetSelect = debounce(this.setSelect, 100);
    this.$bus.$on("mainScroll", this.debouncedSetSelect);
  },
  mounted() {
    this.commentDom = document.getElementById("comments");
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.debouncedSetSelect);
    this.debouncedSetSelect.cancel && this.debouncedSetSelect.cancel();
  },
  methods: {
    handleSelect(tar) {
      if (this.$route.hash !== tar.anchor) {
        this.$router.push({
          path: this.$route.path,
          hash: tar.anchor,
        });
      }
    },
    _addSelectTag(list) {
      if (!list || !Array.isArray(list)) return [];
      return list.map((it) => ({
        ...it,
        isSelected: it.anchor === this.selectedAnchor,
        ...(!!it.children && { children: this._addSelectTag(it.children) }),
      }));
    },
    _getDoms(arr, toc) {
      toc.forEach((it) => {
        arr.push(document.getElementById(it.anchor));
        if (it.children && it.children.length) this._getDoms(arr, it.children);
      });
    },
    _queryCommentDomAndCheckHeight() {
      if (!this.commentDom)
        this.commentDom = document.getElementById("comments");
      return (
        !!this.commentDom && this.commentDom.getBoundingClientRect().top <= 40
      );
    },
    setSelect() {
      this.selectedAnchor = "";
      if (this._queryCommentDomAndCheckHeight()) return;
      const threshold = 80;
      for (const dom of this.doms) {
        if (!dom) continue;
        const top = dom.getBoundingClientRect().top;
        if (top > threshold) break;
        this.selectedAnchor = dom.id;
      }
    },
  },
  computed: {
    tocWithSelect() {
      return this._addSelectTag(this.toc);
    },
    doms() {
      const arr = [];
      this._getDoms(arr, this.toc);
      return arr;
    },
  },
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