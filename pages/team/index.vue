<template>
  <div>

    <el-row class="row-hd row-bg" type="flex" align="bottom">
      <el-col :span="8">
        <Breadcrumb/>
      </el-col>
      <el-col :span="8" :offset="8">
        <div style="float: right;">
          <nuxt-link to="/team/detail" v-if="$auth.hasScope('admin')"><el-button type="text" size="small">Detail</el-button></nuxt-link>
        </div>
      </el-col>
    </el-row>

    <TeamList/>

  </div>
</template>

<script>
  import TeamList from '@/components/TeamList';
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    components: {
      TeamList,
      Breadcrumb
    },
    meta: {
      breadcrumb: [{
        name: 'Home',
        path: '/'
      }, {
        name: 'Team'
      }]
    }
  }
</script>
