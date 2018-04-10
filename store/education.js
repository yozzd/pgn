const state = () => ({
  list: [],
  status: null,
  message: null,
  multi: []
});

const mutations = {
  LIST_EDUCATION (state, list) {
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
      const { data } = await this.$axios.get('/api/education');
      commit('LIST_EDUCATION', data);
    } catch (err) {
      throw err;
    }
  },
  async save ({ dispatch, commit }, { name, description }) {
    try {
      const res = await this.$axios.post('/api/education', { name, description });
      if(res.status === 200) {
        await dispatch('list');
        commit('RES_STATUS', { status: res.status, message: res.data.message });
      }
    } catch (err) {
      throw err;
    }
  },
  async update ({ dispatch, commit }, { id, name, description }) {
    try {
      const res = await this.$axios.put('/api/education/' + id, { name, description });
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
      const res = await this.$axios.post('/api/education/delete', { selected });
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
