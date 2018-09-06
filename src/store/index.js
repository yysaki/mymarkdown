import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: null
  },
  mutations: {
    setCredential (state, user) {
      if (user) {
        state.isLogin = true;
        state.user = user;
      } else {
        state.isLogin = false;
        state.user = null;
      }
    }
  },
  actions: {
    setCredential ({ commit }, user) {
      commit('setCredential', user);
    }
  }
})
