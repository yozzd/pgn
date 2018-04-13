<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="list"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <!--<el-table-column
        property="title"
        label="Title"
        width="300">
      </el-table-column>-->
      <el-table-column
        label="File"
        width="300">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleImage(scope.row)">{{scope.row.file}}</el-button>
          </template>
      </el-table-column>
      <el-table-column
        label="Action">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Edit Culture" :visible.sync="dialogVisible" @close="closeDialog('upload')" :close-on-click-modal="false">
      <el-form label-position="left" :model="form" ref="form" status-icon>
        <el-form-item label="Upload" :label-width="formLabelWidth">
          <el-upload
            ref="upload"
            action=""
            :on-change="handleChange"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">Select File</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" size="small" @click="submit('form')">Update</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Image" :visible.sync="dialogVisibleImage" width="70%" custom-class="dialog" top="5vh">
      <img :src="`/uploads/${this.form.id}/${this.form.file}`"></img>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisibleImage = false">Close</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('culture/list');
    },
    computed: {
      list() {
        return this.$store.state.culture.list;
      }
    },
    data() {
      return {
        dialogVisible: false,
        dialogVisibleImage: false,
        formLabelWidth: '120px',
        form: {
          id: '',
          file: ''
        }
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.$store.commit('culture/MULTI_SELECT', val)
      },
      handleEdit (val) {
        this.dialogVisible = true;
        this.form.id = val._id;
      },
      handleImage(val) {
        this.dialogVisibleImage = true;
        this.form.id = val._id,
        this.form.file = val.file
      },
      handleChange(val) {
        this.form.file = val.raw;
      },
      submit: function(form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            await this.$store.dispatch('culture/update', {
              id: this.form.id,
              file: this.form.file
            });
            if(this.$store.state.culture.status === 200) {
              this.dialogVisible = false;
              this.$refs[form].resetFields();
              this.$message({
                message: this.$store.state.culture.message,
                type: 'success',
                center: true
              });
            }
          } else {
            return false;
          }
        });
      },
      closeDialog(upload) {
        this.$refs[upload].clearFiles();
      }
    }
  }
</script>

<style scoped>
  .image .el-dialog__body {
    padding: 0;
  }
</style>
