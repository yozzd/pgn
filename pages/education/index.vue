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

    <el-dialog title="Add Education" :visible.sync="dialogVisible" @close="closeDialog('form')" width="35%" :close-on-click-modal="closeOn">
      <el-form label-position="left" :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="Name" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Description" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" size="small" @click="submit('form')">Save</el-button>
      </span>
    </el-dialog>

    <Education/>

  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import Education from '@/components/Education';

  export default {
    middleware: 'auth',
    components: {
      Breadcrumb,
      Education
    },
    meta: {
      breadcrumb: [{
        name: 'Home',
        path: '/'
      }, {
        name: 'Education'
      }]
    },
    computed: {
      multi() {
        return this.$store.state.education.multi;
      }
    },
    created() {
      this.$store.dispatch('education/list');
    },
    data() {
      return {
        dialogVisible: false,
        formLabelWidth: '100px',
        closeOn: false,
        form: {
          name: '',
          description: ''
        },
        rules: {
          name: [
            {required: true, message: 'Please input education name', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submit: function(form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            await this.$store.dispatch('education/save', {
              name: this.form.name,
              description: this.form.description
            });
            if(this.$store.state.education.status === 200) {
              this.dialogVisible = false;
              this.$refs[form].resetFields();
              this.$message({
                message: this.$store.state.education.message,
                type: 'success',
                center: true
              });
            }
          } else {
            return false;
          }
        });
      },
      closeDialog(form) {
        this.$refs[form].resetFields();
        this.form.description = '';
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
            await this.$store.dispatch('education/delete', {
              selected: this.multi
            });
          }
          if(this.$store.state.education.status === 200) {
            this.$message({
              message: this.$store.state.education.message,
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
      }
    }
  }
</script>
