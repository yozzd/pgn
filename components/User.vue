<template>
  <div>

    <el-row>
      <el-col :span="24">
        <div>
          <el-table
            ref="multipleTable"
            :data="list"
            :default-sort="{ prop: 'username', order: 'ascending' }"
            style="width: 100%">
            <el-table-column
              prop="username"
              label="Username"
              sortable
              width="200">
            </el-table-column>
            <el-table-column
              prop="role"
              label="Role"
              width="200">
            </el-table-column>
            <el-table-column
              label="Action">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleChangePassword(scope.row)">Change Password</el-button>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="Change Password" :visible.sync="dialogVisible" @close="closeDialog('form')" width="35%" :close-on-click-modal="closeOn">
      <el-form label-position="left" :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="Old Password" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="New Password" prop="newPassword">
          <el-input type="password" v-model="form.newPassword" auto-complete="off"></el-input>
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
        return this.$store.state.user.list;
      }
    },
    data() {
      return {
        dialogVisible: false,
        closeOn: false,
        form: {
          id: '',
          oldPassword: '',
          newPassword: ''
        },
        rules: {
          oldPassword: [
            { required: true, message: 'Please input your old password', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: 'Please input your new password', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleChangePassword(val) {
        this.dialogVisible = true;
        this.form.id = val._id;
      },
      submit: function(form) {
        this.$refs[form].validate(async (valid) => {
          try {
            if (valid) {
              await this.$store.dispatch('user/changePassword', {
                id: this.form.id,
                oldPassword: this.form.oldPassword,
                newPassword: this.form.newPassword
              });
              if(this.$store.state.user.status === 200) {
                this.dialogVisible = false;
                this.$refs[form].resetFields();
                this.$message({
                  message: this.$store.state.user.message,
                  type: 'success',
                  center: true
                });
              } else {
                this.$message({
                  message: this.$store.state.user.message,
                  type: 'error',
                  center: true
                });
              }
            } else {
              return false;
            }
          } catch(err) {
            throw err;
          }
        });
      },
      closeDialog(form) {
        this.$refs[form].resetFields();
      }
    }
  }
</script>
