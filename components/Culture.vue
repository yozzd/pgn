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
    line-height: 500px;
    margin: 0;
    width: 100%;
  }
  .el-carousel__item > img {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .el-carousel__item {
    background-color: #1b1527;
  }
</style>
