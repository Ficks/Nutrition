import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    userid: "",
    Token: "",
  },
  getters: {
    getLogin(state) {
      return {
        userid: state.userid,
        Token: state.Token
      }
    }
  },
  mutations: {
    setLogin(state, data) {
      state.userid = data.userid;
      state.Token = data.Token;
    }
  }
})

export default store;
