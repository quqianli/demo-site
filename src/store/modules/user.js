import { userInfo } from '@/apis/personal';
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {} // 用户基本信息
  },
  getters: {
    isLogin(state) {
      return !!state.token || !!localStorage.getItem('pm_token');
    }
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem('pm_token', token);
      state.token = token;
    },
    clearToken(state) {
      state.token = ''
      localStorage.removeItem('pm_token');
    },
    setUserInfo(state, info) {
      state.userInfo = info || {};
    },
    clearUserInfo(state) {
      state.userInfo = {};
    }
  },
  actions: {
    refreshInfo({ commit }) {
      userInfo().then(res => {
        commit('setUserInfo', res.data)
      })
    }
  }
};
