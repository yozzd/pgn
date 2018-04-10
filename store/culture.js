import moment from 'moment';

const state = () => ({
  list: [],
  listTheme: [],
  listOneTheme: [],
  status: null,
  message: null,
  multi: []
});

const mutations = {
  LIST_CULTURE (state, list) {
    state.list = list;
  },
  LIST_THEME (state, listTheme) {
    state.listTheme = listTheme;
  },
  LIST_ONE_THEME (state, listOneTheme) {
    state.listOneTheme = listOneTheme;
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
  async listTheme ({ commit }) {
    try {
      const { data } = await this.$axios.get('/api/theme');
      commit('LIST_THEME', data);
    } catch (err) {
      throw err;
    }
  },
  async oneTheme ({ commit }) {
    try {
      const day = moment(new Date()).format('dddd');
      const { data } = await this.$axios.get('/api/theme/' + day);
      commit('LIST_ONE_THEME', data);
    } catch(err) {
      throw err;
    }
  },
  async updateTheme ({ dispatch, commit }, { id, theme }) {
    try {
      const res = await this.$axios.put('/api/theme/' + id, { theme });
      if(res.status === 200) {
        await dispatch('listTheme');
        commit('RES_STATUS', { status: res.status, message: res.data.message });
      }
    } catch (err) {
      throw err;
    }
  },
  async list ({ commit }) {
    try {
      const { data } = await this.$axios.get('/api/culture');
      commit('LIST_CULTURE', data);
    } catch (err) {
      throw err;
    }
  },
  async save ({ dispatch, commit }, { file }) {
    try {
      if(file) {
        const formData = new FormData();
        formData.append('file', file);
        this.$axios.setHeader('Content-Type', 'multipart/form-data');
        const res = await this.$axios.post('/api/culture/upload', formData);
        if(res.status === 200) {
          await dispatch('list');
          commit('RES_STATUS', { status: res.status, message: res.data.message });
        }
      }
    } catch (err) {
      throw err;
    }
  },
  async update ({ dispatch, commit }, { id, file }) {
    try {
      if(file) {
        const formData = new FormData();
        formData.append('file', file);
        this.$axios.setHeader('Content-Type', 'multipart/form-data');
        const res = await this.$axios.put('/api/culture/upload/' + id, formData);
        if(res.status === 200) {
          await dispatch('list');
          commit('RES_STATUS', { status: res.status, message: res.data.message });
        }
      }
    } catch (err) {
      throw err;
    }
  },
  async delete ({ dispatch, commit }, { selected }) {
    try {
      const res = await this.$axios.post('/api/culture/delete', { selected });
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
