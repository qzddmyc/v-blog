<template>
  <!-- 只有总页数大于等于1时才显示 -->
  <div class="pager-container" v-if="pageNumber > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }"
      >|&lt;&lt;</a
    >
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }"
      >&lt;&lt;</a
    >
    <a
      v-for="(it, idx) in numbers"
      :key="idx"
      :class="{ active: it === current }"
      @click="handleClick(it)"
      >{{ it }}</a
    >
    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current === pageNumber }"
      >&gt;&gt;</a
    >
    <a
      @click="handleClick(pageNumber)"
      :class="{ disabled: current === pageNumber }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<style lang="less" scoped>
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  user-select: none;
  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>

<script>
export default {
  props: {
    current: {
      // 当前页
      type: Number,
      default: 1,
    },
    total: {
      // 总数据量
      type: Number,
      default: 0,
    },
    limit: {
      // 每页显示多少条
      type: Number,
      default: 10,
    },
    visibleNumber: {
      // 显示多少个页码
      tyle: Number,
      default: 10,
    },
  },
  computed: {
    pageNumber() {
      // 总页数
      return Math.ceil(this.total / this.limit);
    },
    visibleMin() {
      // 显示的最小数字
      return Math.max(1, this.current - Math.floor(this.visibleNumber / 2));
    },
    visibleMax() {
      // 显示的最大数字
      return Math.min(
        this.pageNumber,
        this.visibleMin + this.visibleNumber - 1
      );
    },
    numbers() {
      const arr = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        arr.push(i);
      }
      while (arr.length && arr.length < this.visibleNumber) {
        if (arr[0] === 1) break;
        arr.unshift(arr[0] - 1);
      }
      return arr;
    },
  },
  methods: {
    handleClick(newPage) {
      newPage < 1 && (newPage = 1);
      newPage > this.pageNumber && (newPage = this.pageNumber);
      if (newPage === this.current) return;
      this.$emit("pageChange", newPage);
    },
  },
};
</script>