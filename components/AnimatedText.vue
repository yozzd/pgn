<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="animate-text" v-html="el"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import anime from 'animejs';

  export default {
    mounted: async function() {
      await this.$store.dispatch('culture/oneTheme');
      await this.updateString();
      this.animate();
    },
    computed: {
      culture() {
        return this.$store.state.culture.listOneTheme;
      }
    },
    data() {
      return {
        el: ''
      }
    },
    methods: {
      updateString: async function() {
        if(this.culture) {
          const str = this.culture.theme ? this.culture.theme.split('') : ('Theme not set...').split('');
          const el = await Promise.all(str.map((val) => {
            return val.replace(/([^\s]|\w)/g, "<span class='letter'>$&</span>");
          }));
          this.el = el.join('');
        }
      },
      animate() {
        anime.timeline({loop: true})
          .add({
            targets: '.animate-text .letter',
            translateX: [40,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 3000,
            delay: function(el, i) {
              return 500 + 30 * i;
            }
          }).add({
            targets: '.animate-text .letter',
            translateX: [0,-30],
            opacity: [1,0],
            easing: "easeInExpo",
            duration: 1200,
            delay: function(el, i) {
              return 100 + 30 * i;
            }
          });
      }
    }
  }
</script>
