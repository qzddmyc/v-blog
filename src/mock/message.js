import Mock from "mockjs";
import queryString from "querystring";

Mock.mock("/api/message", "post", function (options) {
  const message = JSON.parse(options.body);
  console.log(options);
  console.log(message);
  return Mock.mock({
    code: 0,
    msg: "",
    data: {
      id: "@guid",
      nickname: message.nickname,
      content: message.content,
      createDate: Date.now(),
      avatar: () => "https://api.dicebear.com/9.x/big-smile/svg?skinColor=f5d7b1,efcc9f,e2ba87&seed=qzddmyc" + parseInt(Math.random() * 10000, 10),
    },
  });
});

Mock.mock(/^\/api\/message\/?(\?.+)?$/, "get", function (options) {
  const query = queryString.parse(options.url.split('?')[1]);
  return Mock.mock({
    code: 0,
    msg: "",
    data: {
      total: 52,
      [`rows|${query.limit || 10}-${query.limit || 10}`]: [
        {
          id: "@guid",
          nickname: "@cname",
          content: "@cparagraph(1, 10)",
          createDate: () => Number(Mock.mock("@date('T')")),
          avatar: () => "https://api.dicebear.com/9.x/big-smile/svg?skinColor=f5d7b1,efcc9f,e2ba87&seed=qzddmyc" + parseInt(Math.random() * 10000, 10),
        },
      ],
    },
  });
});