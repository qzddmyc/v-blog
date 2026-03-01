import request from "./request";

async function getBanner() {
  const resp = await request.get("/api/banner");
  // console.log(resp);
}

export { getBanner };