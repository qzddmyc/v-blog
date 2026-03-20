<template>
  <Layout>
    <div class="main-container" v-loading.dots="isLoading">
      <div class="main-scroll-container" ref="scrollContainer">
        <div class="blog-container" v-if="!!article.id">
          <BlogDetail :blog="article" />
          <Eof />
        </div>
        <div class="comment-container" v-if="!isLoading">
          <BlogComment />
        </div>
      </div>
    </div>
    <template #right>
      <BlogToc :toc="article.toc" />
    </template>
  </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import { getBlog } from "@/api/blog";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail.vue";
import BlogToc from "./components/BlogToc.vue";
import Eof from "./components/Eof.vue";
import BlogComment from "./components/BlogComment.vue";

export default {
  mixins: [fetchData("_fetchData", { toc: [] }, "article")],
  components: { Layout, BlogDetail, BlogToc, Eof, BlogComment },
  methods: {
    async _fetchData() {
      return await getBlog(this.$route.params.id);
    },
    handleScroll() {
      this.$bus.$emit("mainScroll", this.$refs.scrollContainer);
    },
    scrollToHash(hash) {
      // hash 以 # 开头;
      if (hash === "#") {
        this.$refs.scrollContainer.scrollTop = 0;
        return;
      }
      const dom = document.getElementById(hash.slice(1));
      if (!dom) return;
      dom.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    setScroll(n) {
      if (n !== 0) return;
      this.scrollToHash("#");
    },
  },
  mounted() {
    this.$refs.scrollContainer.addEventListener("scroll", this.handleScroll);
    this.$bus.$on("setScroll", this.setScroll);
  },
  updated() {
    const hash = this.$route.hash;
    if (!hash) return;
    setTimeout(() => {
      this.scrollToHash(hash);
    }, 50);
  },
  beforeDestroy() {
    this.$refs.scrollContainer.removeEventListener("scroll", this.handleScroll);
    this.$bus.$emit("mainScroll", null);
    this.$bus.$off("setScroll", this.setScroll);
  },
  watch: {
    "$route.hash": {
      handler(newHash) {
        if (!newHash) return;
        this.$nextTick(() => {
          this.scrollToHash(newHash);
        });
      },
      immediate: false,
    },
  },
};
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  .main-scroll-container {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    box-sizing: border-box;
    padding: 18px;
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>