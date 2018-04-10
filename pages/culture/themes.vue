<template>
  <div>

    <el-row class="row-hd row-bg" type="flex" align="bottom">
      <el-col :span="8">
        <Breadcrumb/>
      </el-col>
      <el-col :span="8" :offset="8">
      </el-col>
    </el-row>

    <CultureThemes/>

  </div>
</template>

<script>
  import CultureThemes from '@/components/CultureThemes';
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    components: {
      CultureThemes,
      Breadcrumb
    },
    meta: {
      breadcrumb: [{
        name: 'Home',
        path: '/'
      }, {
        name: 'Culture',
        path: '/culture'
      }, {
        name: 'Themes'
      }]
    },
    created() {
      this.$store.dispatch('culture/listTheme');
    }
  }
</script>
