<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";

@size-loader: 50px;

.loading-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.center-container {
  width: @size-loader;
  height: @size-loader;
  .self-center();
}

.loader {
  --size-orbe: 10px;
  width: @size-loader;
  height: @size-loader;
  position: relative;
  transform: rotate(45deg);
}

.orbe {
  position: absolute;
  width: 100%;
  height: 100%;
  --delay: calc(var(--index) * 0.09s);
  animation: orbit7456 ease-in-out 1.5s var(--delay) infinite;
  opacity: calc(1 - calc(0.15 * var(--index)));
}

.orbe::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: var(--size-orbe);
  height: var(--size-orbe);
  background-color: @primary;
  border-radius: 50%;
}

@keyframes orbit7456 {
  0% {
  }

  80% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="loading-container">
    <div class="center-container">
      <div class="loader">
        <div class="orbe" style="--index: 0"></div>
        <div class="orbe" style="--index: 1"></div>
        <div class="orbe" style="--index: 2"></div>
        <div class="orbe" style="--index: 3"></div>
        <div class="orbe" style="--index: 4"></div>
        <div class="orbe" style="--index: 5"></div>
      </div>
    </div>
  </div>
</template>
