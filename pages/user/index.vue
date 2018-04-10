<template>
  <div>

    <el-row class="row-hd row-bg" type="flex" align="bottom">
      <el-col :span="8">
        <Breadcrumb/>
      </el-col>
      <el-col :span="8" :offset="8">
        <div style="float: right;">
        </div>
      </el-col>
    </el-row>

    <User/>

  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import User from '@/components/User';

  export default {
    middleware: 'auth',
    components: {
      Breadcrumb,
      User
    },
    meta: {
      breadcrumb: [{
        name: 'Home',
        path: '/'
      }, {
        name: 'User'
      }]
    },
    created() {
      this.$store.dispatch('user/list');
    }
  }
</script>
