import About from "@/views/About";
import Blog from "@/views/Blog";
import Home from "@/views/Home";
import Message from "@/views/Message";
import Project from "@/views/Project";
import BlogDetail from "@/views/Blog/Detail";

const routes = [
  { name: "Home", path: "/", component: Home, meta: { title: "首页" } },
  { name: "About", path: "/about", component: About, meta: { title: "关于我" } },
  { name: "Blog", path: "/blog", component: Blog, meta: { title: "文章" } },
  { name: "CategoryBlog", path: "/blog/cate/:categoryId", component: Blog, meta: { title: "文章" } },
  { name: "BlogDetail", path: "/blog/article/:id", component: BlogDetail, meta: { title: "文章详情" } },
  { name: "Message", path: "/message", component: Message, meta: { title: "留言板" } },
  { name: "Project", path: "/project", component: Project, meta: { title: "我的项目" } },
];

export default routes;