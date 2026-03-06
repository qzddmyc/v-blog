<template>
  <ul class="nav-tree-container" v-if="list && list.length !== 0">
    <li v-for="(it, idx) in list" :key="idx">
      <span @click="handleClick(it)" :class="{ selected: it.isSelected }">
        {{ it.name }}
      </span>
      <NavTree :list="it.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "NavTree",
  props: {
    /**
     *  [
     *    {
     *      name: xxx,
     *      isSelected: true,
     *      children: [
     *        { name: uuu, isSelected: false, children: [...] },
     *        { ... }
     *      ]
     *    },
     *    { ... }
     *  ]
     */
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      this.$emit("select", item);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.nav-tree-container {
  @gap: 5px;
  list-style: none;
  padding: 0;
  .nav-tree-container {
    margin-left: @gap * 4;
  }
  li {
    margin-bottom: @gap;
    cursor: pointer;
    @height: 25px;
    min-height: @height;
    line-height: @height;
    &:first-child {
      margin-top: @gap;
    }
    &:last-child {
      margin-bottom: 0;
    }
    span {
      white-space: nowrap;
      &:hover {
        color: lighten(@warn, 5%);
      }
      &.selected {
        color: @warn;
        font-weight: bold;
      }
    }
  }
}
</style>