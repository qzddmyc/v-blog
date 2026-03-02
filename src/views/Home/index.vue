<template>
  <div class="home-container">
    <ul>
      <li v-for="item in banners" :key="item.id">
        <CarouselItem />
      </li>
    </ul>
    <div class="icon icon-up">
      <Icon type="arrowUp" />
    </div>
    <div class="icon icon-down">
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li v-for="item in banners" :key="item.id"></li>
    </ul>
  </div>
</template>

<script>
import { getBanner } from "@/api/banner";
import Icon from "@/components/Icon";
import CarouselItem from "./Carouselitem";

export default {
  data() {
    return {
      banners: [],
    };
  },
  components: {
    Icon,
    CarouselItem,
  },
  async created() {
    this.banners = await getBanner();
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";

.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  ul {
    margin: 0;
  }
  .icon {
    @gap: 30px;
    @animate-gap: 7px;
    @animate-time: 2.5s;
    .self-center();
    transform: translateX(-50%);
    font-size: 25px;
    color: @gray;
    cursor: pointer;
    &.icon-up {
      top: @gap;
      animation: jump-up @animate-time infinite;
    }
    &.icon-down {
      top: auto;
      bottom: @gap;
      animation: jump-down @animate-time infinite;
    }

    @keyframes jump-up {
      0% {
        transform: translate(-50%, -@animate-gap);
      }
      50% {
        transform: translate(-50%, @animate-gap);
      }
      100% {
        transform: translate(-50%, -@animate-gap);
      }
    }

    @keyframes jump-down {
      0% {
        transform: translate(-50%, @animate-gap);
      }
      50% {
        transform: translate(-50%, -@animate-gap);
      }
      100% {
        transform: translate(-50%, @animate-gap);
      }
    }
  }
}
</style>