<template>
  <div class="blog-category-container" v-loading.dots="isLoading">
    <div class="inner-container" v-show="!isLoading">
      <h2>文章分类</h2>
      <div class="nav-tree-fix-container">
        <div class="nav-tree-scroll-container">
          <NavTree :list="dataList" @select="handleSelect" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTree from "./NavTree.vue";
import fetchData from "@/mixins/fetchData";
import { getBlogCategories } from "@/api/blog";
export default {
  mixins: [fetchData("getBlogCategories", [])],
  components: { NavTree },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    dataList() {
      const sumOfBlogs = this.data.reduce(
        (num, ele) => num + ele.articleCount,
        0
      );
      const arrayWithSum = [
        {
          id: -1,
          articleCount: sumOfBlogs,
          order: -1,
          name: "全部",
        },
        ...this.data,
      ];
      return arrayWithSum.map((it) => ({
        ...it,
        aside: it.articleCount + "篇",
        isSelected: this.categoryId === it.id,
      }));
    },
  },
  methods: {
    getBlogCategories,
    handleSelect(e) {
      const query = {
        page: 1,
        limit: this.limit,
      };
      if (e.id === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: e.id,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blog-category-container {
  width: 250px;
  height: 100%;
  box-sizing: border-box;
  @cate-gap: 20px;
  padding-top: @cate-gap;
  padding-left: @cate-gap;
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
      height: calc(100% - @h2-height - @cate-gap * 2);
      width: 100%;
      margin-top: @cate-gap;
      margin-bottom: @cate-gap;
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