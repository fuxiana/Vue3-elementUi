import { createStore } from "vuex";

export default createStore({
  state: {
    isCollapse: false,
    showMenu: true,
  },
  mutations: {
    collapserMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    SET_SHOW_MENU(state, status) {
      state.showMenu = status;
    },
  },
  actions: {},
  modules: {},
});

