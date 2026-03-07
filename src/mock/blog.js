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
      total: 3000,
      [`rows|${query.limit || 10}`]: [
        {
          id: "@guid",
          title: "@ctitle(3, 50)",
          description: "@cparagraph(3, 10)",
          category: {
            "id|1-10": 0,
            name: "分类@id",
          },
          "scanNumber|0-3000": 0,
          "commentNumber|0-300": 0,
          "thumb|1": [Mock.Random.image("300x250", "#333", "#fff", "Random Image"), null],
          createDate: () => Number(Mock.mock("@date('T')")),
        },
      ],
    },
  });
});