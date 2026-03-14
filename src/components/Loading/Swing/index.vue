<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";

@keyframes follow-the-leader {
  0% {
    transform: rotate(0deg) translateY(-200%);
  }

  60%,
  100% {
    transform: rotate(360deg) translateY(-200%);
  }
}

.loading-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.follow-the-leader-line {
  width: 14px;
  height: 14px;
  .self-center();
}

.follow-the-leader-line div {
  animation: follow-the-leader 1.25s infinite backwards;
  border-radius: 100%;
  height: 100%;
  width: 100%;
  background-color: @primary;
}

.follow-the-leader-line div:nth-child(1) {
  animation-delay: 0.15s;
}

.follow-the-leader-line div:nth-child(2) {
  animation-delay: 0.3s;
}

.follow-the-leader-line div:nth-child(3) {
  animation-delay: 0.45s;
}

.follow-the-leader-line div:nth-child(4) {
  animation-delay: 0.6s;
}

.follow-the-leader-line div:nth-child(5) {
  animation-delay: 0.75s;
}
</style>

<template>
  <div class="loading-container">
    <div class="follow-the-leader-line">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
