import request from './request';

// 获取博客列表
async function getBlogs(page = 1, limit = 10, categoryId = -1) {
  return await request.get("/api/blog", {
    params: {
      page,
      limit,
      categoryid: categoryId,
    },
  });
}

// 获取博客分类
async function getBlogCategories() {
  return await request.get("/api/blogtype");
}

export { getBlogs, getBlogCategories };