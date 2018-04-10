<template>
  <div>

    <el-row :gutter="20" v-for="employee in list" :key="employee._id">
      <el-col :span="6">
        <div>
          <a href="#" class="card" @click="handleInfo(employee)">
            <el-row type="flex" align="middle">
              <el-col :span="8">
                <div>
                  <img v-if="employee.image" :src="`/uploads/${employee._id}/${employee.image}`" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="name">{{employee.name}}</div>
                <div class="position">{{employee.position}}</div>
              </el-col>
            </el-row>
          </a>
        </div>
      </el-col>
      <el-col :span="16">
        <div>
          <el-row type="flex" align="middle" class="status">
            <el-col :span="24">
              <div :class="employee.lineClass" v-if="employee.statusValue > 0"></div>
              <a href="#" class="status" @click="handleStatus(employee)" v-if="$auth.hasScope('admin')">
                <div class="status-round" :class="employee.class">{{employee.statusLabel}}</div>
              </a>
              <div class="status-round" :class="employee.class" v-else>{{employee.statusLabel}}</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="2">
        <div>
          <el-row type="flex" align="middle" class="history">
            <el-col>
              <nuxt-link :to="`/team/${employee._id}/history`"><el-button type="text" size="small">History</el-button></nuxt-link>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="Employee Info" :visible.sync="dialogInfo" custom-class="dialog" width="25%" top="5vh" :close-on-click-modal="closeOn">
      <img v-if="employee.image" :src="`/uploads/${employee.id}/${employee.image}`">
      <i v-else class="el-icon-plus avatarc-uploader-icon"></i>
      <table class="list">
        <tr>
          <td>Name</td>
          <td>:</td>
          <td>{{employee.name}}</td>
        </tr>
        <tr>
          <td>Position</td>
          <td>:</td>
          <td>{{employee.position}}</td>
        </tr>
        <tr>
          <td>Date of Birth</td>
          <td>:</td>
          <td>{{employee.dobf}}</td>
        </tr>
        <tr>
          <td>Education</td>
          <td>:</td>
          <td>{{employee.education}}</td>
        </tr>
        <tr>
          <td colspan="3">
            <el-button type="primary" size="small" @click="dialogInfo = false">Close</el-button>
          </td>
        </tr>
      </table>
    </el-dialog>

    <el-dialog
      title="Set Status"
      :visible.sync="dialogStatus"
      @close="handleStatusClose('form')"
      width="25%"
      :close-on-click-modal="closeOn">
      <el-form
        :model="employee"
        :rules="rules"
        ref="form"
        status-icon>
        <el-form-item prop="status">
          <el-select
            v-model="employee.statusValue"
            placeholder="Select"
            @change="handleChange"
            style="width: 100%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogStatus = false">Cancel</el-button>
        <el-button type="primary" size="small" @click="submit('form')">Update</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('team/list');
    },
    computed: {
      list() {
        return this.$store.state.team.persons;
      }
    },
    data() {
      const validateStatus = (rule, value, callback) => {
        if(!this.employee.statusValue) {
          return callback(new Error('Please select status'));
        } else {
          callback();
        }
      };
      return {
        dialogInfo: false,
        dialogStatus: false,
        closeOn: false,
        employee: {
          id: '',
          name: '',
          position: '',
          dobf: '',
          education: '',
          statusValue: '',
          statusLabel: '',
          image: ''
        },
        options: [{
          label: 'IN OFFICE',
          value: 1
        }, {
          label: 'OUT OFFICE',
          value: 2
        }, {
          label: 'OFFICIAL',
          value: 3
        }, {
          label: 'LEAVE',
          value: 4
        }, {
          label: 'SICK',
          value: 5
        }],
        rules: {
          status: [
            { validator: validateStatus, trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      handleInfo(val) {
        this.dialogInfo = true;
        this.employee.id = val._id;
        this.employee.name = val.name;
        this.employee.position = val.position;
        this.employee.dobf = val.dobf;
        this.employee.education = val.education;
        this.employee.image = val.image;
      },
      handleStatus(val) {
        this.dialogStatus = true;
        this.employee.id = val._id;
        this.employee.statusValue = val.statusValue === 0 ? '' : val.statusValue;
      },
      handleChange(val) {
        this.employee.statusValue = val;
      },
      submit: function(form) {
        try {
          this.$refs[form].validate(async (valid) => {
            if (valid) {
              await this.$store.dispatch('team/statusUpdate', {
                id: this.employee.id,
                statusValue: this.employee.statusValue
              });
              if(this.$store.state.team.status === 200) {
                this.dialogStatus = false;
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
        } catch(err) {
          throw err;
        }
      },
      handleStatusClose(form) {
        this.$refs[form].resetFields();
      }
    }
  }
</script>

<style scoped>
  a.card,
  a.status {
    color: #606266;
    &:focus {
      outline: 0 !important;
    }
  }

  a.card > .el-row {
    padding: 15px;
    height: 75px;
    border: 1px dashed #cccccc;
    border-radius: 9999px;
  }

  .status.el-row {
    padding: 15px;
    height: 75px;
  }

  .history.el-row {
    padding: 15px 0;
    height: 75px;
    text-align: center;
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 9999px;
    display: block;
  }

  .name {
    margin: 0 0 5px 0;
  }

  .position {
    color: #8795a1;
  }

  table.list {
    width: 100%;
    margin-top: -5px;
  }

  table.list > tr > td {
    padding: 0 10px;
    border-bottom: 1px dashed #dddddd;
  }

  table.list > tr:last-child > td {
    border-bottom: 0;
    padding: 0;
  }

  table.list > tr > td > .el-button {
    width: 100%;
  }

  .avatar-uploader-icon {
    width: 50px;
    height: 50px;
    line-height: 50px;
  }

  .avatarc-uploader-icon {
    width: 100%;
    height: 50vh;
    line-height: 50vh;
  }

  .avatar-uploader-icon,
  .avatarc-uploader-icon {
    font-size: 18px;
    color: #8c939d;
    text-align: center;
  }

  .status-round {
    width: 60px;
    height: 60px;
    text-align: center;
    border-radius: 9999px;
    color: #ffffff;
    position: absolute;
    font-size: 10px;
    font-weight: bold;
  }

  .set,
  .in,
  .out,
  .official,
  .leave,
  .sick {
    top: 6px;
  }

  .set {
    left: 0;
    color: #606266;
    background-color: #ffffff;
    border: 1px dashed #cccccc;
  }

  .in {
    left: 18%;
  }

  .in,
  .line-in {
    background-color: #409eff;
  }

  .out {
    left: 36%;
  }

  .out,
  .line-out {
    background-color: #909399;
  }

  .official {
    left: 54%;
  }

  .official,
  .line-official {
    background-color: #3ac150;
  }

  .leave {
    left: 72%;
  }

  .leave,
  .line-leave {
    background-color: #e6a23c;
  }

  .sick {
    left: 90%;
  }

  .sick,
  .line-sick {
    background-color: #f56c6c;
  }

  .line-in,
  .line-out,
  .line-official,
  .line-leave,
  .line-sick {
    height: 5px;
    border-radius: 2px;
  }

  .line-in {
    width: 16%;
  }

  .line-out {
    width: 35%;
  }

  .line-official {
    width: 53.5%;
  }

  .line-leave {
    width: 72%;
  }

  .line-sick {
    width: 91%;
  }

  .break {
    line-height: 14px;
    padding: 14px 5px;
  }

  .no-break {
    line-height: 60px;
  }
</style>
