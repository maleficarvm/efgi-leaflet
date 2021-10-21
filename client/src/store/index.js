import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
    value: "",
    valueApr: "",
    text: "",
  },
  getters: {
    VALUE: (state) => {
      return state.value;
    },
    VALUEAPR: (state) => {
      return state.valueApr;
    },
    TEXT: (state) => {
      return state.text;
    },
    authStatus: (state) => state.status,
  },
  mutations: {
    SET_VALUE: (state, payload) => {
      state.value = payload;
    },
    SET_VALUEAPR: (state, payload) => {
      state.valueApr = payload;
    },
    SET_TEXT: (state, payload) => {
      state.text = payload;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/login",
          data: user,
        })
          .then((res) => {
            const token = res.data.token;
            const user = res.data.user;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(res);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
  },
});
