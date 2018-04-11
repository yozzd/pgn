<template>
  <div>

    <el-row :gutter="20" v-for="item in list" :key="item._id">
      <el-col :span="4">
        <el-tag>{{item.day}}</el-tag>
      </el-col>
      <el-col :span="20" class="list">
        <div>
          <a href="#" @click="handleEdit(item)" v-if="$auth.hasScope('admin') && item.theme">{{item.theme}}</a>
          <a href="#" @click="handleEdit(item)" v-else-if="$auth.hasScope('admin') && !item.theme">Set Culture?</a>
          <span v-else-if="item.theme">{{item.theme}}</span>
          <span v-else>Theme not set!</span>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="Set Culture" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="form" ref="form">
        <el-form-item label="Theme">
          <el-input v-model="form.theme" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" size="small" @click="submit('form')">Update</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    computed: {
      list() {
        return this.$store.state.culture.listTheme;
      }
    },
    data() {
      return {
        dialogVisible: false,
        form: {
          id: '',
          theme: ''
        }
      }
    },
    methods: {
      handleEdit(val) {
        this.dialogVisible = true;
        this.form.id = val._id;
        this.form.theme = val.theme;
      },
      submit: async function(form) {
        try {
          await this.$store.dispatch('culture/updateTheme', {
            id: this.form.id,
            theme: this.form.theme
          });
          if(this.$store.state.culture.status === 200) {
            this.dialogVisible = false;
            this.$message({
              message: this.$store.state.culture.message,
              type: 'success',
              center: true
            });
          }
        } catch(err) {
          throw err;
        }
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 30px;
  }
  .el-row:first-child {
    margin-top: 30px;
  }
  .el-col {
    padding: 15px 0;
  }
  .list.el-col {
    border-bottom: 1px dashed #cccccc;
  }
</style>
