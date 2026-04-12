import request from "./request";

async function getProjects() {
  return await request.get("/api/project");
}

export { getProjects };