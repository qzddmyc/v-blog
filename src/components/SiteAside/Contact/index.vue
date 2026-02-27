<template>
  <div class="contact-container">
    <a :href="item.ref" v-for="(item, idx) in info" :key="idx" target="_blank">
      <Icon
        :type="item.iconType"
        :class="{ weixin: item.iconType === 'weixin' }"
      />
      <span>
        {{ item.txt }}
        <div v-if="!!item.qrCode" class="qrcode">
          <img :src="item.qrCode" />
        </div>
      </span>
    </a>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: { Icon },
  data() {
    return {
      info: [
        {
          ref: "//github/qzddmyc",
          iconType: "github",
          txt: "qzddmyc",
          qrCode: null,
        },
        {
          ref: "mailto:qzddmyc@163.com",
          iconType: "mail",
          txt: "qzddmyc@163.com",
          qrCode: null,
        },
        {
          ref: "//qq.com",
          iconType: "qq",
          txt: "3241982429",
          qrCode: "https://picsum.photos/200",
        },
        {
          ref: null,
          iconType: "weixin",
          txt: "Methry-qzddmyc",
          qrCode: "https://picsum.photos/200/200",
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/global.less";
@import "~@/styles/var.less";

.contact-container {
  display: flex;
  flex-direction: column;
  background: transparent;
  color: @gray;
  @paddingleft: 20px;
  a {
    @margin: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: @paddingleft;
    margin-top: @margin;
    box-sizing: border-box;
    &:last-child {
      margin-bottom: @margin;
      margin-top: @margin - 3px;
    }
    .icon-container {
      font-size: 25px;
      width: 36px;
      &.weixin {
        font-size: 31px;
        text-indent: -3px;
      }
    }
    span {
      @size: 14px;
      font-size: @size;
      line-height: @size;
      margin-left: @paddingleft / 10;
      position: relative;
      .qrcode {
        background-color: @gray;
        @border-size: 128px;
        width: @border-size;
        height: @border-size;
        position: absolute;
        left: 50%;
        bottom: 25px;
        transform-origin: 50% 110%;
        transform: translate(-50%) scaleY(0);
        transition: 0.2s;
        border-radius: 5px;
        &::before {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, -1px);
          width: @border-size / 8;
          height: @border-size / 16;
          background-color: inherit;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
        }
        img {
          @gap: 8px;
          width: @border-size - @gap * 2;
          height: @border-size - @gap * 2;
          margin: @gap;
        }
      }
      &:hover {
        .qrcode {
          transform: translate(-50%);
        }
      }
    }
  }
}
</style>