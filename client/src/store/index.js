import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    value: "",
    valueApr: "",
    text: "",
    role: "",
  },
  getters: {
    value: (state) => {
      return state.value;
    },
    valueApr: (state) => {
      return state.valueApr;
    },
    text: (state) => {
      return state.text;
    },
    role: () => {
      return state.role;
    },
  },
  mutations: {
    setValue: (state, payload) => {
      state.value = payload;
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
