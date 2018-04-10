<template>
  <div>
    <el-row class="row-hd row-bg" type="flex" align="bottom">
      <el-col :span="8">
        <Breadcrumb/>
      </el-col>
      <el-col :span="8" :offset="8">
        <div style="float: right;">
          <el-button type="primary" size="small" @click="dialogVisible = true">Add</el-button>
          <el-button type="danger" size="small" @click="handleDelete" :disabled="multi.length < 1">Delete</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <TeamDetail/>
      </el-col>
    </el-row>

    <el-dialog title="Add Employee" :visible.sync="dialogVisible" @close="closeDialog('form')" :close-on-click-modal="closeOn">
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
        <el-form-item label="Education" :label-width="formLabelWidth" prop="education">
          <el-select v-model="form.education" placeholder="Select" style="width: 100%;">
            <el-option
              v-for="item in education"
              :key="item._id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" size="small" @click="submit('form')">Save</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import TeamDetail from '@/components/TeamDetail';
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    middleware: 'auth',
    components: {
      TeamDetail,
      Breadcrumb
    },
    meta: {
      breadcrumb: [{
        name: 'Home',
        path: '/'
      }, {
        name: 'Team',
        path: '/team'
      }, {
        name: 'Detail'
      }]
    },
    data() {
      return {
        dialogVisible: false,
        formLabelWidth: '120px',
        closeOn: false,
        form: {
          name: '',
          position: '',
          dob: '',
          education: ''
        },
        rules: {
          name: [
            {required: true, message: 'Please input employee name', trigger: 'blur'}
          ],
          position: [
            {required: true, message: 'Please select employee position', trigger: 'change'}
          ],
          dob: [
            {type: 'date', required: true, message: 'Please input employee date of birth', trigger: 'change'}
          ],
          education: [
            {required: true, message: 'Please select employee education', trigger: 'change'}
          ]
        }
      };
    },
    created() {
      this.$store.dispatch('position/list');
      this.$store.dispatch('education/list');
    },
    computed: {
      multi() {
        return this.$store.state.team.multi;
      },
      position() {
        return this.$store.state.position.list;
      },
      education() {
        return this.$store.state.education.list;
      }
    },
    methods: {
      submit: function(form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            await this.$store.dispatch('team/save', {
              name: this.form.name,
              position: this.form.position,
              dob: this.form.dob,
              education: this.form.education
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
      },
      handleDelete: async function() {
        try {
          const stateDelete = await this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            type: 'warning',
            closeOnClickModal: false
          });
          if(stateDelete === 'confirm') {
            await this.$store.dispatch('team/delete', {
              selected: this.multi
            });
          }
          if(this.$store.state.team.status === 200) {
            this.$message({
              message: this.$store.state.team.message,
              type: 'success',
              center: true
            });
          }
        } catch(err) {
          if(err !== 'cancel') {
            this.$message({
              type: 'info',
              message: err,
              center: true
            });
          }
        }
      },
      closeDialog(form) {
        this.$refs[form].resetFields();
      }
    }
  }
</script>
