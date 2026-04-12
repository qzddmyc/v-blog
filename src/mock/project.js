import Mock from "mockjs";

Mock.mock(/^\/api\/project\/?$/, "get", {
  code: 0,
  msg: "",
  "data|10-20": [
    {
      id: "@uuid",
      name: "@ctitle(3, 10)",
      "github|1": ["https://github.com/qzddmyc/v-blog", null],
      "description|2-4": ["@cparagraph(2, 5)"],
      thumb: () => Mock.Random.image(
        "300x250",
        "#333",
        "#fff",
        "Random Image " + Mock.Random.natural(0, 99).toString().padStart(2, '0')
      ),
    },
  ],
});