import { getSetting } from "@/api/setting";
import { titleController } from '@/utils';

export default {
  namespaced: true,
  state: {
    loading: true,
    data: {},
  },
  mutations: {
    setLoading(state, payLoad) {
      state.loading = payLoad;
    },
    setData(state, payLoad) {
      state.data = payLoad;
    }
  },
  actions: {
    async fetchSetting(ctx) {
      if (Object.keys(ctx.state.data).length) return;
      const resp = await getSetting();
      ctx.commit("setData", resp);
      ctx.commit("setLoading", false);
      if (resp.favicon) {
        if (document.querySelector("link[rel*='icon']")) return;
        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "images/x-icon";
        link.href = resp.favicon;
        document.querySelector("head").appendChild(link);
      }
      if (resp.siteTitle) {
        titleController.setSiteTitle(resp.siteTitle);
      }
    }
  }
}