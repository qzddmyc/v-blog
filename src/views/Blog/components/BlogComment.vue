<template>
  <div class="blog-comment-container">
    <MessageArea
      :commentList="commentData.rows"
      title="评论列表"
      :subTitle="`(${commentData.total})`"
      :isListLoading="isLoading"
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
  methods: {
    async _fetchData() {
      return await getComments(this.$route.params.id, this.page++, this.limit);
    },
    async handleSubmit(formData, callback) {
      console.log(formData);
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
</style>