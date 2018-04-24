import moment from 'moment';

const state = () => ({
  persons: [],
  person: [],
  history: [],
  status: null,
  message: null,
  multi: []
});

const mutations = {
  LIST_TEAM (state, persons) {
    state.persons = persons;
  },
  LIST_ONE (state, { person, history }) {
    state.person = person;
    state.history = history;
  },
  RES_STATUS (state, { status, message }) {
    state.status = status;
    state.message = message;
  },
  MULTI_SELECT (state, multi) {
    state.multi = multi;
  }
};

const mapStatus = {
  0: 'SET STATUS',
  1: 'IN OFFICE',
  2: 'OUT OFFICE',
  3: 'OFFICIAL',
  4: 'LEAVE',
  5: 'SICK'
}

const mapClass = {
  0: 'set break',
  1: 'in break',
  2: 'out break',
  3: 'official no-break',
  4: 'leave no-break',
  5: 'sick no-break'
};

const mapLineClass = {
  0: '',
  1: 'line-in',
  2: 'line-out',
  3: 'line-official',
  4: 'line-leave',
  5: 'line-sick'
}

const mapTag = {
  0: '',
  1: '',
  2: 'info',
  3: 'success',
  4: 'warning',
  5: 'danger'
}

const actions = {
  async list ({ commit }) {
    try {
      const { data } = await this.$axios.get('/api/team');
      const res = await Promise.all(data.map((val) => {
        const getStatus = val.status.find((obj) => moment(new Date(obj.date)).format('DD-MM-YYYY') === moment(Date.now()).format('DD-MM-YYYY'));
        return {
          _id: val._id,
          name: val.name,
          position: val.position,
          dob: val.dob,
          dobf: moment(new Date(val.dob)).format('DD-MM-YYYY'),
          hobby: val.hobby,
          statusValue: getStatus === undefined ? 0 : getStatus.value,
          statusLabel: getStatus === undefined ? mapStatus[0] : mapStatus[getStatus.value],
          class: getStatus === undefined ? mapClass[0] : mapClass[getStatus.value],
          lineClass: getStatus === undefined ? mapLineClass[0] : mapLineClass[getStatus.value],
          image: val.image
        }
      }))
      commit('LIST_TEAM', res);
    } catch (err) {
      throw err;
    }
  },
  async one ({ commit }, { id }) {
    try {
      const { data } = await this.$axios.get('/api/team/' + id);
      const history = await Promise.all(data.status.map((val) => {
        return {
          value: val.value,
          label: mapStatus[val.value],
          date: moment(new Date (val.date)).format('DD-MM-YYYY'),
          tag: mapTag[val.value],
          timestamp: moment(new Date (val.timestamp)).format('DD-MM-YYYY HH:mm')
        }
      }));
      delete data.status;
      commit('LIST_ONE', { person: data, history: history });
    } catch(err) {
      throw err;
    }
  },
  async save ({ dispatch, commit }, { name, position, dob, hobby }) {
    try {
      const res = await this.$axios.post('/api/team', { name, position, dob, hobby });
      if(res.status === 200) {
        await dispatch('list');
        commit('RES_STATUS', { status: res.status, message: res.data.message });
      }
    } catch (err) {
      throw err;
    }
  },
  async image ({ dispatch, commit }, { id, file }) {
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('file', file);
      this.$axios.setHeader('Content-Type', 'multipart/form-data');
      const res = await this.$axios.post('/api/team/image', formData);
      if(res.status === 200) {
        await dispatch('list');
        commit('RES_STATUS', { status: res.status, message: res.data.message });
      }
    } catch (err) {
      throw err;
    }
  },
  async update ({ dispatch, commit }, { id, name, position, dob, hobby }) {
    try {
      const res = await this.$axios.put('/api/team/' + id, { name, position, dob, hobby });
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
      const res = await this.$axios.post('/api/team/delete', { selected });
      if(res.status === 200) {
        await dispatch('list');
        commit('RES_STATUS', { status: res.status, message: res.data.message });
      }
    } catch (err) {
      throw err;
    }
  },
  async statusUpdate ({ dispatch, commit }, { id, statusValue }) {
    try {
      const res = await this.$axios.put('/api/team/status/' + id, { statusValue });
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
