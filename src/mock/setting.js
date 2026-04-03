import Mock from "mockjs";
import avatar from "@/img/cat.jpeg";
import qqQrCode from "@/img/qrcode-qq.png";
import weixinQrCode from "@/img/qrcode-vx.png";
import favicon from "@/img/favicon.ico";

Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar,
    siteTitle: "我的个人空间",
    github: "https://github.com/qzddmyc",
    qq: "3241982429",
    qqQrCode,
    weixin: "Methry_qzddmyc",
    weixinQrCode,
    mail: "qzddmyc@163.com",
    icp: "苏ICP备2025181248号",
    githubName: "qzddmyc",
    favicon,
  },
});