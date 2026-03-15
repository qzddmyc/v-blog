<template>
  <div class="blog-comment-container">
    <MessageArea
      :commentList="commentData.rows"
      title="评论列表"
      :subTitle="`(${commentData.total})`"
      :isListLoading="isLoading"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import { getComments } from "@/api/blog";
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
  },
};
</script>

<style lang="less" scoped>
</style>