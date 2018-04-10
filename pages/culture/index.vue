<template>
  <div>

    <el-row class="row-hd row-bg" type="flex" align="bottom">
      <el-col :span="8">
        <Breadcrumb/>
      </el-col>
      <el-col :span="8" :offset="8">
        <div style="float: right;" v-if="$auth.hasScope('admin')">
          <ul class="list-inline">
            <li><nuxt-link to="/culture/detail"><el-button type="text" size="small">Detail</el-button></nuxt-link></li>
            <li><nuxt-link to="/culture/themes"><el-button type="text" size="small">Themes</el-button></nuxt-link></li>
          </ul>
        </div>
      </el-col>
    </el-row>

    <Culture/>

  </div>
</template>

<script>
  import Culture from '@/components/Culture';
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    components: {
      Culture,
      Breadcrumb
    },
    meta: {
      breadcrumb: [{
        name: 'Home',
        path: '/'
      }, {
        name: 'Culture'
      }]
    },
    created() {
      this.$store.dispatch('culture/list');
    }
  }
</script>
