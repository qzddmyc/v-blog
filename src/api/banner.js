import request from "./request";

async function getBanner() {
  const resp = await request.get("/api/banner");
  return resp;
}

export { getBanner };