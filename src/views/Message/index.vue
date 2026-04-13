<template>
  <div
    class="message-container"
    ref="message-scroll-container"
    v-loading="isInitLoading"
  >
    <MessageArea
      title="留言板"
      v-if="!isInitLoading"
      :subTitle="`(${messageData.total})`"
      :isListLoading="!isInitLoading && isLoading"
      :isCommentsAllLoaded="isMessagesAllLoaded"
      :commentList="messageData.rows"
      textareaPlaceholder="留言"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import * as messageApi from "@/api/message";
import mainScroll from "@/mixins/mainScroll";

export default {
  mixins: [
    mainScroll("message-scroll-container"),
    fetchData(
      "_fetchData",
      { total: 0, rows: [] },
      "messageData",
      [],
      "isInitLoading"
    ),
  ],
  data() {
    return {
      page: 1,
      limit: 10,
      isLoading: false,
    };
  },
  components: { MessageArea },
  computed: {
    isMessagesAllLoaded() {
      // Originally, "===" should be used here, but for mock data, ">=" is needed.
      return this.messageData.rows.length >= this.messageData.total;
    },
  },
  methods: {
    async _fetchData() {
      return await messageApi.getMessage(this.page++, this.limit);
    },
    async handleSubmit(data, callback) {
      const resp = await messageApi.postMessage(data);
      if (resp) {
        this.messageData.rows.unshift(resp);
        this.messageData.total++;
      }
      callback({
        content: resp ? "提交成功" : "提交失败",
        type: resp ? "success" : "error",
      });
    },
    handleScroll(dom) {
      if (this.isLoading || !dom) return;
      const range = 90;
      if (dom.scrollHeight - dom.scrollTop - dom.clientHeight > range) return;
      this._fetchMore();
    },
    async _fetchMore() {
      if (this.isMessagesAllLoaded) return;
      this.isLoading = true;
      const next = await this._fetchData();
      next.total > this.messageData.total &&
        (this.messageData.total = next.total);
      this.messageData.rows = this.messageData.rows.concat(next.rows);
      this.isLoading = false;
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
.message-container {
  width: 100%;
  height: 100%;
  padding: 40px 0;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;
  position: relative;
}

.message-area-container {
  width: 85%;
  margin: 0 auto;
  padding: 0 40px;
  min-width: 600px;
}
</style>