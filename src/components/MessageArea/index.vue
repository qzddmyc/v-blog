<template>
  <div class="message-area-container" id="comments">
    <div class="fake-margin-top"></div>
    <InputForm v-on="$listeners" />
    <DataList :title="title" :subTitle="subTitle" :comments="commentList" />
    <div
      class="loading"
      v-loading.domino="isListLoading"
      v-show="isListLoading"
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
  },
};
</script>

<style lang="less" scoped>
.message-area-container {
  margin-bottom: 30px;
  .fake-margin-top {
    height: 50px;
    width: 100%;
  }
  .loading {
    height: 50px;
    width: 100%;
    position: relative;
  }
}
</style>