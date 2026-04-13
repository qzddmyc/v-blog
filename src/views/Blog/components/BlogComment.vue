<template>
  <div class="blog-comment-container" id="comments">
    <div class="fake-margin-top"></div>
    <MessageArea
      :commentList="commentData.rows"
      title="评论列表"
      :subTitle="`(${commentData.total})`"
      :isListLoading="isLoading"
      :isCommentsAllLoaded="isEndOfComment"
      textareaPlaceholder="评论"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import { getComments, postComment } from "@/api/blog";
export default {
  mixins: [fetchData("_fetchData", { total: 0, rows: [] }, "commentData")],
  components: { MessageArea },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    isEndOfComment() {
      return this.commentData.rows.length >= this.commentData.total;
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      if (this.isLoading || !dom) return;
      const range = 90;
      if (dom.scrollHeight - dom.scrollTop - dom.clientHeight > range) return;
      this._fetchMore();
    },
    async _fetchData() {
      return await getComments(this.$route.params.id, this.page++, this.limit);
    },
    async _fetchMore() {
      if (this.isEndOfComment) return;
      this.isLoading = true;
      const next = await this._fetchData();
      next.total > this.commentData.total &&
        (this.commentData.total = next.total);
      this.commentData.rows = this.commentData.rows.concat(next.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      if (resp) {
        this.commentData.rows.unshift(resp);
        this.commentData.total++;
      }
      callback({
        content: resp ? "评论成功" : "评论失败",
        type: resp ? "success" : "error",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.fake-margin-top {
  height: 50px;
  width: 100%;
}
</style>