<template>
  <div class="not-found-container">
    <div class="not-found">
      <h1 class="code">404</h1>
      <p class="message">哎呀，页面找不到了</p>
      <p class="hint">您访问的页面不存在或已被移除</p>
      <a href="/" class="home-link">返回首页</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";

.not-found-container {
  width: 100%;
  height: 100%;
  position: relative;

  .not-found {
    .self-center();
    text-align: center;
    overflow: hidden;

    .code {
      font-size: 8em;
      font-weight: bold;
      color: @primary;
      margin: 0;
      line-height: 1;
    }

    .message {
      font-size: 1.5em;
      color: @words;
      margin: 12px 0 16px;
    }

    .hint {
      font-size: 1em;
      color: @lightWords;
      margin: 0 0 30px;
    }

    .home-link {
      display: inline-block;
      padding: 8px 24px;
      background-color: @primary;
      color: #fff;
      border-radius: 4px;
      text-decoration: none;
      font-size: 0.95em;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.85;
      }
    }
  }
}
</style>