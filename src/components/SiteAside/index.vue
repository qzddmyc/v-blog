<template>
  <div class="site-aside-container" v-loading.drop="loading">
    <div class="avatar" :class="{ opacity0: loading }">
      <Avatar :url="data.avatar || ''" />
    </div>
    <div class="menu" :class="{ opacity0: loading }">
      <Menu />
    </div>
    <div class="contact" :class="{ opacity0: loading }">
      <Contact />
    </div>
    <footer class="footer" :class="{ opacity0: loading }">
      <a
        href="https://beian.miit.gov.cn"
        target="_blank"
        rel="noopener noreferrer"
        >{{ data.icp || " " }}</a
      >
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
  computed: mapState("setting", ["data", "loading"]),
};
</script>

<style scoped lang="less">
@import "~@/styles/global.less";
@import "~@/styles/var.less";

.opacity0 {
  opacity: 0;
}

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
  position: relative;
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