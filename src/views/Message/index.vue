<template>
  <div class="message-container">
    <MessageArea title="Methry-qzddmyc"/>
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
export default {
  components: { MessageArea },
};
</script>

<style lang="less" scoped>
.message-container{
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>