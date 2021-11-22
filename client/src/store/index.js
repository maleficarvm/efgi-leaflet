import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    valueMap: "",
    valueApr: "",
    text: "",
    role: "",
  },
  getters: {
    value: (state) => {
      return state.valueMap;
    },
    valueApr: (state) => {
      return state.valueApr;
    },
    text: (state) => {
      return state.text;
    },
    role: (state) => {
      return state.role;
    },
  },
  mutations: {
    setValueMap: (state, payload) => {
      state.valueMap = payload;
    },
    setValueApr: (state, payload) => {
      state.valueApr = payload;
    },
    setText: (state, payload) => {
      state.text = payload;
    },
    setRole: (state, payload) => {
      state.role = payload;
    },
  },
  actions: {},
});
