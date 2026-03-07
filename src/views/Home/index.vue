<template>
  <div v-loading="isLoading" class="home-container" ref="homeContainer">
    <ul
      class="carousel-container"
      :style="{ marginTop: marginTop }"
      @wheel="debounceMouseWheel"
      @transitionstart="handleTransitionStart"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="(item, idx) in banners" :key="item.id">
        <CarouselItem
          :carousel="item"
          :idxOfThis="idx"
          :currentShowingIdx="index"
          :inTransition="inTransition"
        />
      </li>
    </ul>
    <div
      class="icon icon-up"
      v-show="banners.length && index >= 1"
      @click="switchTo(index - 1)"
    >
      <Icon type="arrowUp" />
    </div>
    <div
      class="icon icon-down"
      v-show="banners.length && index < banners.length - 1"
      @click="switchTo(index + 1)"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        v-for="(item, idx) in banners"
        :key="item.id"
        :class="{ active: index === idx }"
        @click="switchTo(idx)"
      ></li>
    </ul>
  </div>
</template>

<script>
import { getBanner } from "@/api/banner";
import Icon from "@/components/Icon";
import CarouselItem from "./Carouselitem";
import fetchData from "@/mixins/fetchData.js";

export default {
  mixins: [fetchData("getBanner", [], "banners")],
  data() {
    return {
      index: 0, // 当前显示的第几张轮播图，0-based
      containerHeight: 0, // home-container的高度
      debounceMouseWheel: () => {},
      inTransition: false, // 是否正在页面的切换，传递给子组件，用于刷新数据
    };
  },
  components: {
    Icon,
    CarouselItem,
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
  },
  created() {
    this.debounceMouseWheel = this.$debounce(this.mouseWheel, 200);
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    this.debounceMouseWheel.cancel && this.debounceMouseWheel.cancel();
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    getBanner,
    switchTo(idx) {
      if (this.index === idx) return;
      if (idx < 0 || idx >= this.banners.length) return;
      this.index = idx;
    },
    mouseWheel(e) {
      if (e.deltaY > 0) this.switchTo(this.index + 1);
      else if (e.deltaY < 0) this.switchTo(this.index - 1);
    },
    handleResize() {
      this.containerHeight = this.$refs.homeContainer.clientHeight;
    },
    _isTransitionCausedByMarginTop(event) {
      return (
        !!event?.propertyName &&
        ["marginTop", "margin-top"].includes(event.propertyName)
      );
    },
    handleTransitionStart(e) {
      if (!this._isTransitionCausedByMarginTop(e)) return;
      this.inTransition = true;
    },
    handleTransitionEnd(e) {
      if (!this._isTransitionCausedByMarginTop(e)) return;
      this.inTransition = false;
    },
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
  overflow: hidden; // 避免外边距合并

  // Test
  // width: 400px;
  // height: 300px;
  // overflow: visible;
  // margin: 0 auto;
  // margin-top: 150px;
  // border: 2px solid #008c8c;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 0.5s;
    li {
      width: 100%;
      height: 100%;
    }
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
  .indicator {
    .self-center();
    transform: translateY(-50%);
    left: auto;
    right: 25px;
    li {
      @size: 8px;
      @white-color: #fff;
      width: @size;
      height: @size;
      margin-bottom: 7px;
      cursor: pointer;
      position: relative;
      &::before {
        display: block;
        content: "";
        width: inherit;
        height: inherit;
        background-color: @white-color;
        border-radius: 50%;
        z-index: 10;
      }
      &::after {
        @size-small: @size / 10 * 7;
        display: block;
        content: "";
        width: @size-small;
        height: @size-small;
        background-color: @words;
        border-radius: 50%;
        .self-center();
        z-index: 20;
      }
      &.active {
        &::after {
          background-color: @white-color;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>