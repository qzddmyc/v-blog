import Mock from "mockjs";
import queryString from 'querystring';

Mock.mock("/api/blogtype", "get", {
  code: 0,
  msg: "",
  "data|10-20": [
    {
      "id|+1": 1,
      name: "分类@id",
      "articleCount|0-300": 0,
      order: "@id",
    },
  ],
});

Mock.mock(/^\/api\/blog(\?.+)?$/, "get", function (options) {
  const query = queryString.parse(options.url.split('?')[1]);
  return Mock.mock({
    code: 0,
    msg: "",
    data: {
      "total|2000-3000": 0,
      [`rows|${query.limit || 10}`]: [
        {
          id: "@guid",
          title: "@ctitle",
          description: "@cparagraph(1, 10)",
          category: {
            "id|1-10": 0,
            name: "分类@id",
          },
          "scanNumber|0-3000": 0,
          "commentNumber|0-300": 0,
          thumb: Mock.Random.image("300x250", "#666", "#fff", "Random Image"),
          createDate: `@date('T')`,
        },
      ],
    },
  });
});