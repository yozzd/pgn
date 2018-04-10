<template>
  <div>

    <el-row :gutter="20" type="flex" justify="center" align="middle" class="main">
      <el-col :span="6">
        <div>
          <nuxt-link to="/team"><el-button size="small">Our Team</el-button></nuxt-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <nuxt-link to="/culture"><el-button size="small">Our Culture</el-button></nuxt-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <nuxt-link to="/product"><el-button size="small">Our Product</el-button></nuxt-link>
        </div>
      </el-col>
    </el-row>

    <AnimatedText/>

  </div>
</template>

<script>
  import AnimatedText from '@/components/AnimatedText';

  export default {
    components: {
      AnimatedText
    }
  }
</script>

<style scoped>
  .main.el-row {
    height: 70vh;
  }
  .el-col > div {
    text-align: center;
  }
</style>

