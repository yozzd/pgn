<template>
  <div>

    <el-row class="row-hd row-bg" type="flex" align="bottom">
      <el-col :span="8">
        <Breadcrumb/>
      </el-col>
      <el-col :span="8" :offset="8">
        <div style="float: right;">
          <nuxt-link type="text" to="/product/detail" v-if="$auth.hasScope('admin')">Detail</nuxt-link>
        </div>
      </el-col>
    </el-row>

    <ProductList/>

  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import ProductList from '@/components/ProductList';

  export default {
    components: {
      Breadcrumb,
      ProductList
    },
    meta: {
      breadcrumb: [{
        name: 'Home',
        path: '/'
      }, {
        name: 'Product'
      }]
    }
  }
</script>

