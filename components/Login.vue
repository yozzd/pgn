<template>
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <el-form label-position="left" :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span>
        <el-button type="primary" size="small" @click="submit('form')">Login</el-button>
      </span>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: 'Please input username', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please input password', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submit: function(form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            try {
              await this.$auth.login({
                data: {
                  username: this.form.username,
                  password: this.form.password
                }
              });
            } catch(err) {
              if(err.response.status === 401) {
                this.$message({
                  message: err.response.data.message,
                  type: 'error',
                  center: true
                });
              };
            }
          } else {
            return false;
          }
        });
      }
    }
  }
</script>
