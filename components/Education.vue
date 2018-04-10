<template>
  <div>

    <el-row>
      <el-col :span="24">
        <div>
          <el-table
            ref="multipleTable"
            :data="list"
            :default-sort="{ prop: 'name', order: 'ascending' }"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="Education"
              sortable
              width="200">
            </el-table-column>
            <el-table-column
              prop="description"
              label="Description"
              width="200">
            </el-table-column>
            <el-table-column
              label="Action">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="Edit Education" :visible.sync="dialogVisible" width="35%" :close-on-click-modal="closeOn">
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
        <el-button type="primary" size="small" @click="submit('form')">Update</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    computed: {
      list() {
        return this.$store.state.education.list;
      }
    },
    data() {
      return {
        dialogVisible: false,
        formLabelWidth: '80px',
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
      handleSelectionChange(val) {
        this.$store.commit('education/MULTI_SELECT', val)
      },
      handleEdit (row) {
        this.dialogVisible = true;
        this.form.id = row._id;
        this.form.name = row.name;
        this.form.description = row.description;
      },
      submit: function(form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            await this.$store.dispatch('education/update', {
              id: this.form.id,
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
      }
    }
  }
</script>
