import request from "./request";

async function getMessage(page = 1, limit = 10) {
  return await request.get("/api/message", {
    params: {
      page, limit,
    },
  });
}

/**
 * @param {String} msgInfo.nickname
 * @param {String} msgInfo.content
 */
async function postMessage(msgInfo) {
  return await request.post("/api/message", msgInfo);
}

export { getMessage, postMessage };