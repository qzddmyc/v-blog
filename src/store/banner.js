import { getBanner } from "@/api/banner";

export default {
  namespaced: true,
  state: {
    isLoading: false,
    banners: [],
  },
  mutations: {
    setLoading(state, payLoad) {
      state.isLoading = payLoad;
    },
    setBanners(state, payLoad) {
      state.banners = payLoad;
    }
  },
  actions: {
    async fetchBanner(ctx) {
      if (ctx.state.banners.length) return;
      ctx.commit("setLoading", true);
      const resp = await getBanner();
      ctx.commit("setBanners", resp);
      ctx.commit("setLoading", false);
    }
  }
}
