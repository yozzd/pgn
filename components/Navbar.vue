<template>
  <div>
    <el-row class="header" type="flex" align="middle">
      <el-col :span="24">
        <div class="nav-right" v-if="$auth.hasScope('admin')">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">Manage<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="position">Position</el-dropdown-item>
                <el-dropdown-item command="user">User</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
          <el-button type="text" size="small" @click="$auth.logout()">Logout</el-button>
        </div>
        <div class="nav-right" v-else>
          <nuxt-link to="/login"><el-button type="text" size="small">Login</el-button></nuxt-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    methods: {
      handleCommand(command) {
        const path = {
          position: '/position',
          user: '/user'
        }

        this.$router.replace({ path: path[command] });
      }
    }
  }
</script>

<style scoped>
  .header.el-row {
    height: 60px;
    margin-bottom: 0;
    background-color: #f9fafc;
  }
  .nav-right {
    float: right;
  }
  .nav-right .el-button {
    margin-left: 20px;
  }
</style>
