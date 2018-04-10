<template>
  <div>

    <el-row class="row-hd row-bg" type="flex" align="bottom">
      <el-col :span="8">
        <Breadcrumb/>
      </el-col>
    </el-row>

    <Login/>

  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import Login from '@/components/Login';

  export default {
    components: {
      Breadcrumb,
      Login
    },
    meta: {
      breadcrumb: [{
        name: 'Home',
        path: '/'
      }, {
        name: 'Login'
      }]
    }
  }
</script>
