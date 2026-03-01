import axios from "axios";
import { showMessage } from "@/utils";

// Response format:
//   {
//     "code": 0,   // 错误码
//     "msg": "",   // 错误消息
//     "data": null // 具体的消息内容，如果 code 不为 0，则必为 null
//   }

const ins = axios.create();

ins.interceptors.response.use(function (resp) {
  if (resp.data.code !== 0) {
    showMessage({
      content: resp.data.msg,
      type: 'error',
      duration: 1000,
    });
    return null;
  }
  return resp.data.data;
});

export default ins;