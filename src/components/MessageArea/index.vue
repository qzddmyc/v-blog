<template>
  <div class="message-area-container">
    <InputForm />
    <DataList />
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