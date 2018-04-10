<template>
  <div>

    <el-row class="row-hd row-bg" type="flex" align="bottom">
      <el-col :span="8">
        <Breadcrumb/>
      </el-col>
    </el-row>

    <Player/>

  </div>
</template>

<script>
  import Player from '@/components/Player';
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    components: {
      Player,
      Breadcrumb
    },
    meta: {
      breadcrumb: [{
        name: 'Home',
        path: '/'
      }, {
        name: 'Product',
        path: '/product'
      }, {
        name: 'Player'
      }]
    }
  }
</script>
