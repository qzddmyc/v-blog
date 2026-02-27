<template>
  <div class="site-aside-container">
    <div class="avatar">
      <Avatar :url="catImg" />
    </div>
    <div class="menu">
      <Menu />
    </div>
    <div class="contact">
      <Contact />
    </div>
    <footer class="footer">
      <a href="/">苏ICP备2025181248号</a>
    </footer>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
import catImg from "@/img/cat.jpeg";
export default {
  data() {
    return { catImg };
  },
  components: {
    Avatar,
    Menu,
    Contact,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/global.less";
@import "~@/styles/var.less";

.site-aside-container {
  width: 100%;
  min-width: 230px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: @dark;
  overflow-x: hidden;
  overflow-y: auto;
  .avatar {
    width: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .menu {
    width: 100%;
    height: 290px;
    margin-top: 20px;
  }
  .contact {
    width: 100%;
    padding-left: 10%;
    box-sizing: border-box;
  }
  .footer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 40px;
    margin-bottom: 20px;
    a {
      color: @words;
      font-size: 12px;
      &:hover {
        color: @lightWords;
      }
    }
  }
}
</style>