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
        property="title"
        label="Title"
        width="300">
      </el-table-column>
      <el-table-column
        label="Description"
        width="400">
          <template slot-scope="scope">
            <div class="description">{{ scope.row.description }}</div>
          </template>
      </el-table-column>
      <el-table-column
        label="File"
        width="300">
          <template slot-scope="scope">
            <nuxt-link :to="`/product/${scope.row._id}/player`"><el-button type="text" size="small">{{ scope.row.file }}</el-button></nuxt-link>
          </template>
      </el-table-column>
      <el-table-column
        label="Action">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Edit Product" :visible.sync="dialogVisible" :close-on-click-modal="closeOn">
      <el-form label-position="left" :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="Title" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Description" :label-width="formLabelWidth">
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
        <el-button type="primary" size="small" @click="submit('form')">Update</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('product/list');
    },
    computed: {
      list() {
        return this.$store.state.product.list;
      }
    },
    data() {
      return {
        dialogVisible: false,
        formLabelWidth: '120px',
        closeOn: false,
        form: {
          id: '',
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
      handleSelectionChange(val) {
        this.$store.commit('product/MULTI_SELECT', val)
      },
      handleEdit (val) {
        this.dialogVisible = true;
        this.form.id = val._id;
        this.form.title = val.title;
        this.form.description = val.description;
      },
      handleChange(val) {
        this.form.file = val.raw;
      },
      submit: function(form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            await this.$store.dispatch('product/update', {
              id: this.form.id,
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
      }
    }
  }
</script>
