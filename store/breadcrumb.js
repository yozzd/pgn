const state = () => ({
  route: null,
  matched: []
});

const mutations = {
  BREADCRUMB_LIST (state, { route, matched }) {
    state.route = route;
    state.matched = matched;
  }
};

const actions = {
  async set ({ commit }, { route, matched }) {
    try {
      commit('BREADCRUMB_LIST', { route, matched });
    } catch (err) {
      throw err;
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
