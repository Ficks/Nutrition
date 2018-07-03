import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    userid: "",
    Token: "",
    headurl: "",
    username: "",
  },
  getters: {
    getLogin(state) {
      return {
        userid: state.userid,
        Token: state.Token,
        headurl: state.headurl,
        username: state.username,
      }
    }
  },
  mutations: {
    setLogin(state, data) {
      state.userid = data.userid;
      state.Token = data.Token;
      state.headurl = data.headurl;
      state.username = data.username;
    }
  }
})

export default store;
