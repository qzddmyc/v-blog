<template>
  <div class="blog-list-container" v-loading.dots="isLoading">
    <div class="blog-list-container-scroll" ref="container">
      <ul>
        <li v-for="item in blog.rows" :key="item.id">
          <div class="thumb" v-if="!!item.thumb">
            <RouterLink
              :to="{
                name: 'BlogDetail',
                params: { id: item.id },
              }"
            >
              <img :src="item.thumb" :alt="item.title" :title="item.title" />
            </RouterLink>
          </div>
          <div class="main" :class="{ controlWidth: !!item.thumb }">
            <h2>
              <RouterLink
                :to="{
                  name: 'BlogDetail',
                  params: { id: item.id },
                }"
              >
                {{ item.title }}
              </RouterLink>
            </h2>
            <div class="aside">
              <span>日期：{{ formatDate(item.createDate) }}</span>
              <span>浏览：{{ item.scanNumber }}</span>
              <span>评论：{{ item.commentNumber }}</span>
              <RouterLink
                :to="{
                  name: 'CategoryBlog',
                  params: {
                    categoryId: item.category.id,
                  },
                }"
              >
                {{ item.category.name }}
              </RouterLink>
            </div>
            <div class="desc">{{ item.description }}</div>
          </div>
        </li>
      </ul>
      <div class="pager-outer-container">
        <Pager
          :current="routerInfo.page"
          :total="blog.total"
          :limit="routerInfo.limit"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData";
import { getBlogs } from "@/api/blog";
import { formatDate } from "@/utils";
export default {
  mixins: [fetchData("_fetchData", { rows: [] }, "blog")],
  components: { Pager },
  computed: {
    routerInfo() {
      const categoryId = +this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return { categoryId, page, limit };
    },
  },
  methods: {
    formatDate,
    async _fetchData() {
      return await getBlogs(
        this.routerInfo.page,
        this.routerInfo.limit,
        this.routerInfo.categoryId
      );
    },
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routerInfo.limit,
      };
      if (this.routerInfo.categoryId === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: this.routerInfo.categoryId,
          },
        });
      }
    },
  },
  watch: {
    async $route() {
      this.isLoading = true;
      this.$refs.container.scrollTop = 0;
      this.blog = await this._fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .blog-list-container-scroll {
    @img-max-width: 200px;
    @thumb-margin-right: 15px;
    @main-min-with-with-thumb-exist: 240px;
    @sum: @img-max-width + @thumb-margin-right + @main-min-with-with-thumb-exist;
    @ul-padding-left-right: 20px;
    line-height: 1.7;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    scroll-behavior: smooth;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      min-width: @sum;
      padding: @ul-padding-left-right;
      padding-top: 10px;
      li {
        display: flex;
        padding: 20px 0;
        border-bottom: 1px solid @gray;
        min-width: @sum;
        .thumb {
          flex: 0 0 auto;
          margin-right: @thumb-margin-right;
          img {
            display: block;
            max-width: @img-max-width;
            max-height: 250px;
            border-radius: 5px;
          }
        }
        .main {
          flex: 1 1 auto;
          min-width: @sum;
          &.controlWidth {
            min-width: @main-min-with-with-thumb-exist;
          }
          h2 {
            margin: 0;
            line-height: 1.4;
          }
          .aside {
            font-size: 12px;
            color: @gray;
            margin-top: 5px;
            span {
              margin-right: 15px;
            }
          }
          .desc {
            margin-top: 15px;
            font-size: 14px;
          }
        }
      }
    }
    .pager-outer-container {
      width: 100%;
      min-width: @sum;
      margin: 0 auto;
      padding-left: @ul-padding-left-right;
      padding-right: @ul-padding-left-right;
      box-sizing: border-box;
      .pager-container {
        white-space: nowrap;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
}
</style>