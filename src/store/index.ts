import { createStore } from "vuex";

export default createStore({
  state: {
    isCollapse: false,
  },
  mutations: {
    collapserMenu(state) {
      console.log(1212);
      state.isCollapse = !state.isCollapse;
    },
  },
  actions: {},
  modules: {},
});
