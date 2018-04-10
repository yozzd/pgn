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

    <el-dialog title="Add Position" :visible.sync="dialogVisible" @close="closeDialog('form')" width="35%" :close-on-click-modal="closeOn">
      <el-form label-position="left" :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="Name" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" size="small" @click="submit('form')">Save</el-button>
      </span>
    </el-dialog>

    <Position/>

  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import Position from '@/components/Position';

  export default {
    middleware: 'auth',
    components: {
      Breadcrumb,
      Position
    },
    meta: {
      breadcrumb: [{
        name: 'Home',
        path: '/'
      }, {
        name: 'Position'
      }]
    },
    computed: {
      multi() {
        return this.$store.state.position.multi;
      }
    },
    created() {
      this.$store.dispatch('position/list');
    },
    data() {
      return {
        dialogVisible: false,
        formLabelWidth: '100px',
        closeOn: false,
        form: {
          name: ''
        },
        rules: {
          name: [
            {required: true, message: 'Please input position name', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submit: function(form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            await this.$store.dispatch('position/save', {
              name: this.form.name
            });
            if(this.$store.state.position.status === 200) {
              this.dialogVisible = false;
              this.$refs[form].resetFields();
              this.$message({
                message: this.$store.state.position.message,
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
            await this.$store.dispatch('position/delete', {
              selected: this.multi
            });
          }
          if(this.$store.state.position.status === 200) {
            this.$message({
              message: this.$store.state.position.message,
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
