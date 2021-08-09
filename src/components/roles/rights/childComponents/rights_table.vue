<template>
  <div>
    <!--    表格区域-->
    <el-table
      class="table"
      :data="rightMes"
      style="width: 100%"
      stripe
      border>
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="mobile"
                       label="权限等级">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.level | getTagColor"
            disable-transitions>{{scope.row.level | getLevel}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!--      分页区域-->
<!--    <el-pagination-->
<!--      class="el-pagination"-->
<!--      @size-change="handleSizeChange"-->
<!--      @current-change="handleCurrentChange"-->
<!--      :current-page="usersMes.pagenum"-->
<!--      :page-sizes="[1, 2, 5, 10]"-->
<!--      :page-size="usersMes.pagesize"-->
<!--      layout="total, sizes, prev, pager, next, jumper"-->
<!--      :total="total">-->
<!--    </el-pagination>-->
<!--    <users_editDialog :isShow="isShow"-->
<!--                      @isFalse="isFalse"-->
<!--                      :userMes="onlyUser"-->
<!--                      @editUserMes="editUserMes"/>-->
  </div>
</template>

<script>
export default {
  name: "rights_table",
  props:{
    rightMes:{
      type: Array,
      default(){
        return []
      }
    }
  },
  filters:{
    getLevel(num){
      switch (num){
        case "0":
          return '一级';
        case "1":
          return '二级';
        case "2":
          return '三级';
      }
    },
    getTagColor(num){
      switch (num){
        case "0":
          return 'primary';
        case "1":
          return 'success';
        case "2":
          return 'warning';
      }
    }
  }
}
</script>

<style scoped>
.table{
  margin-top: 15px;
  font-size: 13px;
}
</style>
