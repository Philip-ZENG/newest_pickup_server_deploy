export default {
  namespaced: true,
  state() {
    return {
      activity_id: null,
    };
  },
  getters: {
    getActivityId(state) {
      return state.activity_id;
    },
  },
  mutations: {
    setActivityId(state, data) {
      state.activity_id = data.activity_id;
    },
  },
  actions: {
    setActivityId(context, data) {
      context.commit('setActivityId', data);
    },
  },
};
