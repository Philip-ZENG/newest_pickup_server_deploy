export default {
  namespaced: true,
  state() {
    return {
      admin_id: null,
    };
  },
  getters: {
    getAdminId(state) {
      return state.admin_id;
    },
  },
  mutations: {
    setAdminId(state, data) {
      state.admin_id = data.admin_id;
    },
  },
  actions: {
    setAdminId(context, data) {
      context.commit('setAdminId', data);
    },
  },
};
