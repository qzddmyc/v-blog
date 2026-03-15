<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <aside class="aside">
      <span>日期：{{ formatDate(blog.createDate) }}</span>
      <span>浏览次数：{{ blog.scanNumber }}</span>
      <span>
        <RouterLink :to="{ hash: '#comments' }"
          >评论数量：{{ blog.commentNumber }}</RouterLink
        >
      </span>
      <span>
        <RouterLink
          :to="{
            name: 'CategoryBlog',
            params: {
              categoryId: blog.category.id,
            },
          }"
          >{{ blog.category.name }}</RouterLink
        >
      </span>
    </aside>
    <div class="content-container">
      <div v-html="blog.htmlContent" class="markdown-body"></div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils";
import "highlight.js/styles/github.css";
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/markdown.css";
.blog-detail-container {
  .aside {
    color: @gray;
    font-size: 13px;
    span {
      margin-right: 1em;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .content-container {
    margin: 40px 0;
  }
}
</style>