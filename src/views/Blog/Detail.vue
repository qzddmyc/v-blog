<template>
  <Layout>
    <div class="main-container" v-loading.dots="isLoading">
      <div class="main-scroll-container">
        <div class="blog-container" v-if="!!article.id">
          <BlogDetail :blog="article" />
          <Eof />
        </div>
        <div class="comment-container"  v-if="!isLoading">
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