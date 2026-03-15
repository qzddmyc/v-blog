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

// 获取单篇博客
async function getBlog(id) {
  return await request.get(`/api/blog/${id}`);
}

/**
 * 提交评论
 * @param {Object} comment
 * @param {String} comment.nickname
 * @param {String} comment.content
 * @param {*} comment.blogId
 * @returns 
 */
async function postComment(comment) {
  if (!comment.nickname || !comment.content || !comment.blogId) console.warn("Wrong comment format!");
  return await request.post("/api/comment", comment);
}


async function getComments(blogid, page = 1, limit = 10) {
  return await request.get("/api/comment", {
    params: {
      page, limit, blogid,
    }
  })
}

export { getBlogs, getBlogCategories, getBlog, postComment, getComments };