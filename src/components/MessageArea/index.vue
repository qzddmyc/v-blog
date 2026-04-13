<template>
  <div class="message-area-container">
    <InputForm v-on="$listeners" :textareaPlaceholder="textareaPlaceholder" />
    <DataList :title="title" :subTitle="subTitle" :comments="commentList" />
    <div
      class="loading"
      v-loading.domino="isListLoading"
      v-show="!isCommentsAllLoaded"
    ></div>
  </div>
</template>

<script>
import InputForm from "./components/InputForm.vue";
import DataList from "./components/DataList.vue";
export default {
  components: { InputForm, DataList },
  props: {
    commentList: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    isListLoading: {
      type: Boolean,
      required: true,
    },
    isCommentsAllLoaded: {
      type: Boolean,
      required: true,
    },
    textareaPlaceholder: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.message-area-container {
  margin-bottom: 30px;
  .loading {
    height: 50px;
    width: 100%;
    margin-top: 30px;
    position: relative;
  }
}
</style>