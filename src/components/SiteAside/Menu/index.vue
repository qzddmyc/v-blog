<template>
  <div class="menu-container">
    <ul>
      <li
        v-for="item in renderInfo"
        :key="item.name"
        :style="{ height: !itemNumber ? '100%' : 100 / itemNumber + '%' }"
      >
        <RouterLink
          :to="{ name: item.name }"
          :exact="!item.notExact"
          active-class="selected"
          exact-active-class=""
          tabindex="-1"
        >
          <Icon :type="item.icon" />
          <span>{{ item.span }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: { Icon },
  data() {
    return {
      renderInfo: [
        {
          icon: "home",
          span: "首页",
          name: "Home",
        },
        {
          icon: "blog",
          span: "文章",
          notExact: true,
          name: "Blog",
        },
        {
          icon: "info",
          span: "关于我",
          name: "About",
        },
        {
          icon: "code",
          span: "项目&效果",
          name: "Project",
        },
        {
          icon: "chat",
          span: "留言板",
          name: "Message",
        },
      ],
    };
  },
  computed: {
    itemNumber() {
      return this.renderInfo.length;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/global.less";
.menu-container {
  @margin: 24px;
  width: 100%;
  height: calc(100% - (@margin * 2));
  color: @gray;
  margin: @margin 0;
  box-sizing: border-box;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    background-color: transparent;
    li {
      list-style: none;
      width: 100%;
      font-size: 16px;
      padding-left: 25%;
      box-sizing: border-box;
      cursor: pointer;
      min-height: 40px;
      &:hover {
        color: white;
      }
      &:has(a.selected) {
        color: white;
        background-color: @words;
      }
      a {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        color: inherit;
        .icon-container {
          margin-top: 2px;
        }
        span {
          text-align: center;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>