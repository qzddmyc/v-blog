import request from "./request";

async function getAbout() {
  return await request.get("/api/about");
}

export { getAbout };