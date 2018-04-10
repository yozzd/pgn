const state = () => ({
  list: [],
  listOne: [],
  listFilter: [],
  status: null,
  message: null,
  multi: []
});

const mutations = {
  LIST_PRODUCT (state, list) {
    state.list = list;
  },
  LIST_PRODUCT_FILTER (state, listFilter) {
    state.listFilter = listFilter;
  },
  LIST_ONE (state, listOne) {
    state.listOne = listOne;
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
      const { data } = await this.$axios.get('/api/product');
      commit('LIST_PRODUCT', data);
    } catch (err) {
      throw err;
    }
  },
  async listFilter ({ commit }) {
    try {
      const { data } = await this.$axios.get('/api/product/listFilter');
      commit('LIST_PRODUCT_FILTER', data);
    } catch (err) {
      throw err;
    }
  },
  async one ({ commit }, { id }) {
    try {
      const { data } = await this.$axios.get('/api/product/' + id);
      commit('LIST_ONE', data);
    } catch(err) {
      throw err;
    }
  },
  async save ({ dispatch, commit }, { title, description, file }) {
    try {
      if(file) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);
        this.$axios.setHeader('Content-Type', 'multipart/form-data');
        const res = await this.$axios.post('/api/product/upload', formData);
        if(res.status === 200) {
          await dispatch('list');
          commit('RES_STATUS', { status: res.status, message: res.data.message });
        }
      } else {
        const res = await this.$axios.post('/api/product', { title, description });
        if(res.status === 200) {
          await dispatch('list');
          commit('RES_STATUS', { status: res.status, message: res.data.message });
        }
      }
    } catch (err) {
      throw err;
    }
  },
  async update ({ dispatch, commit }, { id, title, description, file }) {
    try {
      if(file) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);
        this.$axios.setHeader('Content-Type', 'multipart/form-data');
        const res = await this.$axios.put('/api/product/upload/' + id, formData);
        if(res.status === 200) {
          await dispatch('list');
          commit('RES_STATUS', { status: res.status, message: res.data.message });
        }
      } else {
        const res = await this.$axios.put('/api/product/' + id, { title, description });
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
      const res = await this.$axios.post('/api/product/delete', { selected });
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
