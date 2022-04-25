import { createStore } from 'vuex';
import UserManagementModule from './UserManagement/index';
import ActivityManagementModule from './ActivityManagement/index';
import AdminAccountManagementModule from './AdminAccountManagement/index';

const store = createStore({
  modules: {
    userManagement: UserManagementModule,
    activityManagement: ActivityManagementModule,
    adminAccountManagement: AdminAccountManagementModule,
  },
  // state is equivalent to data
  state() {
    return {
      user_id: null,
      admin_id: null,
      user_token: null,
      isLogIn: false,
      // true means identity is user, false means identity is admin
      isUser: false,
      isAdmin: false,
      isGuest: true,
    };
  },
  // getter is equivalent to computed property
  getters: {
    getUserId(state) {
      return state.user_id;
    },
    getAdminId(state) {
      return state.admin_id;
    },
    getUserToken(state) {
      return state.user_token;
    },
    getIsLogIn(state) {
      return state.isLogIn;
    },
    getIsUser(state) {
      return state.isUser;
    },
    getIsAdmin(state) {
      return state.isAdmin;
    },
    getIsGuest(state) {
      return state.isGuest;
    },
  },
  // mutation is equivalent to method
  mutations: {
    setUserId(state, data) {
      state.user_id = data.user_id;
    },
    setAdminId(state, data) {
      state.admin_id = data.admin_id;
    },
    setUserToken(state, data) {
      state.user_token = data.user_token;
    },
    setIsLogIn(state, data) {
      state.isLogIn = data.isLogIn;
    },
    setIsUser(state, data) {
      state.isUser = data.isUser;
    },
    setIsGuest(state, data) {
      state.isGuest = data.isGuest;
    },
    setIsAdmin(state, data) {
      state.isAdmin = data.isAdmin;
    },
  },
  /**
   * action is similar to events, we should not call mutations directly from our vue app
   * we should always call the action that wraps the mutation to execute them
   */
  actions: {
    setUserId(context, data) {
      context.commit('setUserId', data);
    },
    setAdminId(context, data) {
      context.commit('setAdminId', data);
    },
    setUserToken(context, data) {
      context.commit('setUserToken', data);
    },
    setIsLogIn(context, data) {
      context.commit('setIsLogIn', data);
    },
    setIsUser(context, data) {
      context.commit('setIsUser', data);
    },
    setIsGuest(context, data) {
      context.commit('setIsGuest', data);
    },
    setIsAdmin(context, data) {
      context.commit('setIsAdmin', data);
    },
  },
});

export default store;
