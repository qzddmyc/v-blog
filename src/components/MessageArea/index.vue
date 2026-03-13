<template>
  <div class="message-area-container">
    <InputForm />
    <DataList title="评论列表" subMsg="(100)"/>
    <div class="loading"></div>
  </div>
</template>

<script>
import InputForm from "./components/InputForm.vue";
import DataList from "./components/DataList.vue";
export default {
  components: { InputForm, DataList },
};
</script>

<style lang="less" scoped>
.message-area-container{
  margin-top: 50px;
  margin-bottom: 30px;
}
</style>