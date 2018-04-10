const state = () => ({
  list: [],
  status: null,
  message: null
});

const mutations = {
  LIST_USER (state, list) {
    state.list = list;
  },
  RES_STATUS (state, { status, message }) {
    state.status = status;
    state.message = message;
  }
};

const actions = {
  async list ({ commit }) {
    try {
      const { data } = await this.$axios.get('/api/user');
      commit('LIST_USER', data);
    } catch (err) {
      throw err;
    }
  },
  async changePassword ({ dispatch, commit }, { id, oldPassword, newPassword }) {
    try {
      const res = await this.$axios.put('/api/user/' + id + '/password', { oldPassword, newPassword });
      if(res.status === 200) {
        await dispatch('list');
        commit('RES_STATUS', { status: res.status, message: res.data.message });
      }
    } catch (err) {
      commit('RES_STATUS', { status: err.response.status, message: err.response.data.message });
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
