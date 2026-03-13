<template>
  <div class="data-list-container">
    <h3>
      <span class="title">{{ title }}</span>
      <span class="subMsg">{{ subMsg }}</span>
    </h3>
    <ul>
      <li
        class="comment-item"
        v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :key="i"
      >
        <div class="avatar-outer-container">
          <Avatar
            :size="44"
            url="https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg"
          />
        </div>
        <div class="comment-main">
          <div class="comment-info">
            <div class="user-name">Nickname</div>
            <div class="comment-time">2026-03-13 13:22:21</div>
          </div>
          <div class="comment-text">Titanic - Machine Learning from Disaster</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subMsg: {
      type: String,
      default: "",
    },
  },
  components: { Avatar },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.data-list-container {
  width: 100%;
  margin: 50px 0;
  overflow: hidden;
  h3 {
    margin: 0;
    margin-bottom: 18px;
    .subMsg {
      margin-left: 5px;
    }
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    .comment-item {
      padding: 15px 0;
      box-sizing: border-box;
      display: flex;
      min-width: 300px;
      border-bottom: 1px solid lighten(@gray, 20%);
      .avatar-outer-container {
        margin-right: 15px;
        flex: 0 0 auto;
      }
      .comment-main {
        width: 100%;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        .comment-info {
          display: flex;
          justify-content: space-between;
          white-space: nowrap;
          height: 20px;
          line-height: 20px;
          margin-bottom: 10px;
          .user-name {
            color: darken(@success, 10%);
            font-size: 16px;
          }
          .comment-time {
            color: @gray;
            font-size: 12px;
          }
        }
        .comment-text {
          font-size: 14px;
          color: @dark;
        }
      }
    }
  }
}
</style>