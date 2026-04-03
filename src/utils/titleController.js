const title = {
  siteTitle: "",
  routerTitle: "",
};

function setTitle() {
  document.title = title.siteTitle && title.routerTitle
    ? `${title.siteTitle} - ${title.routerTitle}`
    : title.siteTitle || title.routerTitle || "loading...";
}

export default {
  setSiteTitle(val) {
    title.siteTitle = val;
    setTitle();
  },
  setRouterTitle(val) {
    title.routerTitle = val;
    setTitle();
  },
  init() {
    setTitle();
  }
}