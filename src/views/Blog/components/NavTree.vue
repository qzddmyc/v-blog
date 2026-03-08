<template>
  <ul class="nav-tree-container" v-if="list && list.length !== 0">
    <li v-for="(it, idx) in list" :key="idx">
      <p @click="handleClick(it)" :class="{ selected: it.isSelected }">
        <span>{{ it.name }}</span>
        <span v-if="it.aside" class="aside">
          {{ it.aside }}
        </span>
      </p>
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
      if (!item.isSelected) this.$emit("select", item);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.nav-tree-container {
  @gap: 5px;
  list-style: none;
  margin: 0;
  padding: 0;
  .nav-tree-container {
    margin-left: @gap * 4;
  }
  li {
    margin-bottom: @gap;
    font-size: 14px;
    @height: 30px;
    min-height: @height;
    line-height: @height;
    li {
      &:first-child {
        margin-top: @gap;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
    p {
      white-space: nowrap;
      margin: 0;
      width: fit-content;
      cursor: pointer;
      span {
        &.aside {
          margin-left: 0.9em;
          font-size: 12px;
          color: @gray;
        }
      }
      &:hover {
        color: lighten(@warn, 5%);
        span {
          &.aside {
            color: lighten(@warn, 20%);
          }
        }
      }
      &.selected {
        color: @warn;
        font-weight: bold;
        span {
          &.aside {
            color: lighten(@warn, 15%);
          }
        }
      }
    }
  }
}
</style>