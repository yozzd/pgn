const state = () => ({
  list: [],
  status: null,
  message: null,
  multi: []
});

const mutations = {
  LIST_POSITION (state, list) {
    state.list = list;
  },
  RES_STATUS (state, { status, message }) {
    state.status = status;
    state.message = message;
  },
  MULTI_SELECT (state, multi) {
    state.multi = multi;
  }
};

const actions = {
  async list ({ commit }) {
    try {
      const { data } = await this.$axios.get('/api/position');
      commit('LIST_POSITION', data);
    } catch (err) {
      throw err;
    }
  },
  async save ({ dispatch, commit }, { name }) {
    try {
      const res = await this.$axios.post('/api/position', { name });
      if(res.status === 200) {
        await dispatch('list');
        commit('RES_STATUS', { status: res.status, message: res.data.message });
      }
    } catch (err) {
      throw err;
    }
  },
  async update ({ dispatch, commit }, { id, name }) {
    try {
      const res = await this.$axios.put('/api/position/' + id, { name });
      if(res.status === 200) {
        await dispatch('list');
        commit('RES_STATUS', { status: res.status, message: res.data.message });
      }
    } catch (err) {
      throw err;
    }
  },
  async delete ({ dispatch, commit }, { selected }) {
    try {
      const res = await this.$axios.post('/api/position/delete', { selected });
      if(res.status === 200) {
        await dispatch('list');
        commit('RES_STATUS', { status: res.status, message: res.data.message });
      }
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
