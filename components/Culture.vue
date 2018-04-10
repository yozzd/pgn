<template>
  <div>

    <el-row>
      <el-col :span="24">
        <el-carousel :interval="5000" arrow="always" v-if="list.length" height="500px">
          <el-carousel-item v-for="item in list" :key="item._id">
            <img :src="`/uploads/${item._id}/${item.file}`"></img>
          </el-carousel-item>
        </el-carousel>
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
    },
    created() {
      this.$store.dispatch('culture/list');
    },
    computed: {
      list() {
        return this.$store.state.culture.list;
      }
    }
  }
</script>

<style scoped>
  .el-carousel__item {
    text-align: center;
  }

  .el-carousel__item .el-button {
    color: #ffffff;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    width: 100%;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #a3b4cc;
  }
</style>
