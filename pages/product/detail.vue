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
        <ProductDetail/>
      </el-col>
    </el-row>

    <el-dialog title="Add Product" :visible.sync="dialogVisible" @close="closeDialog('form')" :close-on-click-modal="closeOn">
      <el-form label-position="left" :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="Title" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Description" :label-width="formLabelWidth" prop="description">
          <el-input type="textarea" :rows="6" v-model="form.description"></el-input>
        </el-form-item>
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
        <el-button type="primary" size="small" @click="submit('form')">Save</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import ProductDetail from '@/components/ProductDetail';
  import Breadcrumb from '@/components/Breadcrumb';

  export default {
    middleware: 'auth',
    components: {
      ProductDetail,
      Breadcrumb
    },
    meta: {
      breadcrumb: [{
        name: 'Home',
        path: '/'
      }, {
        name: 'Product',
        path: '/product'
      }, {
        name: 'Detail'
      }]
    },
    computed: {
      multi() {
        return this.$store.state.product.multi;
      }
    },
    data() {
      return {
        dialogVisible: false,
        formLabelWidth: '120px',
        closeOn: false,
        form: {
          title: '',
          description: '',
          file: ''
        },
        rules: {
          title: [
            {required: true, message: 'Please input product title', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleChange(val) {
        this.form.file = val.raw;
      },
      submit: function(form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            await this.$store.dispatch('product/save', {
              title: this.form.title,
              description: this.form.description,
              file: this.form.file
            });
            if(this.$store.state.product.status === 200) {
              this.dialogVisible = false;
              this.$refs[form].resetFields();
              this.$message({
                message: this.$store.state.product.message,
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
            await this.$store.dispatch('product/delete', {
              selected: this.multi
            });
          }
          if(this.$store.state.product.status === 200) {
            this.$message({
              message: this.$store.state.product.message,
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
