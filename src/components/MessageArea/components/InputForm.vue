<template>
  <form class="input-form-container">
    <div class="item-container text-container">
      <input type="text" maxlength="10" />
      <div class="tips">
        <div class="error"></div>
        <div class="limit">0/10</div>
      </div>
    </div>
    <div class="item-container textarea-container">
      <textarea maxlength="300" />
      <div class="tips">
        <div class="error">错误</div>
        <div class="limit">0/300</div>
      </div>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.tips {
  width: 100%;
  margin-top: 6px;
  @tip-height: 20px;
  height: @tip-height;
  line-height: @tip-height;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  .error {
    color: @danger;
  }
  .limit {
    color: @gray;
  }
}

.input-form-container {
  width: 100%;
  height: 100%;
  .item-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    &.text-container {
      width: 50%;
    }
    &.textarea-container {
      width: 100%;
    }
  }
  input {
    width: 100%;
    height: 40px;
    padding: 0 10px;
  }
  textarea {
    resize: vertical;
    width: 100%;
    min-height: 120px;
    padding: 10px;
  }
}

input,
textarea {
  outline: none;
  border: 1px dashed @gray;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
  &:focus {
    border: 1px dashed @primary;
  }
}
</style>