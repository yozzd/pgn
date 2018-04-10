<template>
  <div>

    <el-row>
     <el-col :span="16">
        <video width="100%" :src="`/uploads/${list._id}/${list.file}`" type="video/mp4" controls autoplay></video>
        <h3 class="title">{{list.file}}</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <i class="el-icon-news"></i>
      </el-col>
      <el-col :span="14">
        <div class="description">{{list.description}}</div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    mounted: async function() {
      await this.$store.dispatch('product/one', {id: this.$route.params.id});
    },
    computed: {
      list() {
        return this.$store.state.product.listOne;
      }
    }
  }
</script>

<style scoped>
  h3.title {
    margin-top: 20px;
    color: #000000;
  }
  .el-icon-news {
    font-size: 24px;
  }
</style>
