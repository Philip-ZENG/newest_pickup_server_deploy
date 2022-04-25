export default {
  namespaced: true,
  state() {
    return {
      user_id: null,
    };
  },
  getters: {
    getUserId(state) {
      return state.user_id;
    },
  },
  mutations: {
    setUserId(state, data) {
      state.user_id = data.user_id;
    },
  },
  actions: {
    setUserId(context, data) {
      context.commit('setUserId', data);
    },
  },
};
