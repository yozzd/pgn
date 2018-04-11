<template>
  <div>

    <el-row>
     <el-col :span="16">
        <d-player :options="options" ref="player"></d-player>
        <h3 class="title">{{file}}</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <i class="el-icon-news"></i>
      </el-col>
      <el-col :span="14">
        <div class="description">{{description}}</div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import VueDPlayer from 'vue-dplayer'
  import 'vue-dplayer/dist/vue-dplayer.css'

  export default {
    components: {
      'd-player': VueDPlayer
    },
    data() {
      return {
        options: {
          video: {
            url: ''
          }
        },
        player: null,
        file: '',
        description: ''
      }
    },
    mounted: async function() {
      await this.$store.dispatch('product/one', {id: this.$route.params.id});
      const get = await this.$store.state.product.listOne;
      this.player = this.$refs.player.dp;
      this.player.video.src = `/uploads/${get._id}/${get.file}`;
      this.player.play();
      this.file = get.file;
      this.description = get.description;
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
