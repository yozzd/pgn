<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, idx) in matched" :key="idx" :to="{ 'path': item.path }">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    computed: {
      matched() {
        return this.$store.state.breadcrumb.matched;
      }
    }
  }
</script>
