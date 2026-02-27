<!-- 父组件需要 position: relative; -->

<template>
  <div class="empty-container">
    <Icon type="empty" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: { Icon },
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";

.empty-container {
  .self-center();
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon-container {
    color: @gray;
    font-size: 115px;
  }
  p {
    @size: 18px;
    color: @lightWords;
    font-weight: bold;
    font-size: @size;
    line-height: @size;
    margin-top: 1.5 * @size;
  }
}
</style>