import Vuex from 'vuex';
import team from './team';
import breadcrumb from './breadcrumb';
import position from './position';
import education from './education';
import user from './user';
import culture from './culture';
import product from './product';

export default () => {
  return new Vuex.Store({
    modules: {
      team,
      breadcrumb,
      position,
      education,
      user,
      culture,
      product
    }
  });
};
