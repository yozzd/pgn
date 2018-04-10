<template>
  <div>

    <el-row type="flex" align="middle" class="card">
      <el-col :span="2">
        <div>
          <img v-if="employee.image" :src="`/uploads/${employee._id}/${employee.image}`" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="name">{{employee.name}}</div>
        <div class="position">{{employee.position}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <el-table
            :data="history"
            :default-sort="{ prop: 'date', order: 'ascending' }"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="Date"
              sortable
              width="200">
            </el-table-column>
            <el-table-column
              label="Status"
              width="200">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.tag">{{scope.row.label}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
              prop="timestamp"
              label="Timestamp">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    computed: {
      employee() {
        return this.$store.state.team.person;
      },
      history() {
        return this.$store.state.team.history;
      }
    }
  }
</script>

<style scoped>
  .card.el-row {
    padding: 0 100px;
    height: 75px;
    border-bottom: 1px solid #e5e9f2;
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 9999px;
    display: block;
  }

  .avatar-uploader-icon {
    width: 50px;
    height: 50px;
    line-height: 50px;
  }

  .name {
    margin: 0 0 5px 0;
  }

  .position {
    color: #8795a1;
  }
</style>
