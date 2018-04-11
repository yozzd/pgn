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
      <el-table-column
        label="Image"
        width="160">
        <template slot-scope="scope">
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="handleUpload"
            :data="{'id': scope.row._id}"
            :show-file-list="false"
            :before-upload="beforeUpload">
            <img v-if="scope.row.image" :src="`/uploads/${scope.row._id}/${scope.row.image}`" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column
        property="name"
        label="Name"
        width="200">
      </el-table-column>
      <el-table-column
        property="position"
        label="Position"
        width="200">
      </el-table-column>
      <el-table-column
        property="dobf"
        label="Date of Birth"
        width="150">
      </el-table-column>
      <el-table-column
        property="hobby"
        label="Hobby"
        width="200">
      </el-table-column>
      <el-table-column
        label="Action">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Edit Employee" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form label-position="left" :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="Name" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Position" :label-width="formLabelWidth" prop="position">
          <el-select v-model="form.position" placeholder="Select" style="width: 100%;">
            <el-option
              v-for="item in position"
              :key="item._id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Date Of Birth" :label-width="formLabelWidth" prop="dob">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            format="dd-MM-yyyy"
            v-model="form.dob"
            style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Hobby" :label-width="formLabelWidth">
          <el-input v-model="form.hobby" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" size="small" @click="submit('form')">Update</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    height: 122px;
    width: 122px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 18px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
    border-radius: 6px;
  }
</style>

<script>
  export default {
    created() {
      this.$store.dispatch('team/list');
      this.$store.dispatch('position/list');
    },
    computed: {
      list() {
        return this.$store.state.team.persons;
      },
      position() {
        return this.$store.state.position.list;
      }
    },
    data() {
      return {
        dialogVisible: false,
        formLabelWidth: '120px',
        form: {
          id: '',
          name: '',
          position: '',
          dob: '',
          hobby: ''
        },
        rules: {
          name: [
            {required: true, message: 'Please input employee name', trigger: 'blur'}
          ],
          position: [
            {required: true, message: 'Please input employee position', trigger: 'blur'}
          ],
          dob: [
            {type: 'date', required: true, message: 'Please input employee date of birth', trigger: 'change'}
          ]
        }
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.$store.commit('team/MULTI_SELECT', val)
      },
      beforeUpload(file) {
        const isPic = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPic) {
          this.$message.error('Image must be JPG/PNG format!');
        }
        if (!isLt2M) {
          this.$message.error('Image size can not exceed 2MB!');
        }
        return isPic && isLt2M;
      },
      handleUpload: async function(val) {
        try {
          await this.$store.dispatch('team/image', {
            id: val.data.id,
            file: val.file
          });
          if(this.$store.state.team.status === 200) {
            this.$message({
              message: this.$store.state.team.message,
              type: 'success',
              center: true
            });
          }
        } catch(err) {
          throw err;
        }
      },
      handleEdit (row) {
        this.dialogVisible = true;
        this.form.id = row._id;
        this.form.name = row.name;
        this.form.position = row.position;
        this.form.dob = new Date(row.dob);
        this.form.hobby = row.hobby;
      },
      submit: function(form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            await this.$store.dispatch('team/update', {
              id: this.form.id,
              name: this.form.name,
              position: this.form.position,
              dob: this.form.dob,
              hobby: this.form.hobby
            });
            if(this.$store.state.team.status === 200) {
              this.dialogVisible = false;
              this.$refs[form].resetFields();
              this.$message({
                message: this.$store.state.team.message,
                type: 'success',
                center: true
              });
            }
          } else {
            return false;
          }
        });
      }
    }
  }
</script>
