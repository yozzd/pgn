<template>
  <div>

    <el-row class="row-hd row-bg" type="flex" align="bottom">
      <el-col :span="8">
        <Breadcrumb/>
      </el-col>
    </el-row>

    <TeamHistory/>

  </div>
</template>

<script>
  import TeamHistory from '@/components/TeamHistory';
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    components: {
      TeamHistory,
      Breadcrumb
    },
    created() {
      this.$store.dispatch('team/one', {id: this.$route.params.id});
    },
    meta: {
      breadcrumb: [{
        name: 'Home',
        path: '/'
      }, {
        name: 'Team',
        path: '/team'
      }, {
        name: 'History'
      }]
    }
  }
</script>
