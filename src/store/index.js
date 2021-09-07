import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
  },
  actions: {
    GET_VALUE: (state, payload) => {},
  },
});
