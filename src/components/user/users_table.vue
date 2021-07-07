<template>
  <div>
<!--    表格区域-->
    <el-table
      class="table"
      :data="users"
      style="width: 100%"
      stripe
      border>
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="mg_state" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="change(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="编辑信息" placement="top" :enterable="false">
            <el-button icon="el-icon-edit" type="primary" size="mini" @click="editMes(scope.$index)"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="移除用户" placement="top" :enterable="false">
            <el-button icon="el-icon-delete" type="danger" size="mini" @click="deleted(scope.$index)"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button icon="el-icon-setting" type="warning" size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!--      分页区域-->
    <el-pagination
      class="el-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="usersMes.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="usersMes.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <users_editDialog :isShow="isShow"
                      @isFalse="isFalse"
                      :userMes="onlyUser"
                      @editUserMes="editUserMes"/>
  </div>
</template>

<script>
import users_editDialog from '@/components/user/users_editDialog'
export default {
  name: "users_table",
  components:{
    users_editDialog
  },
  props:{
    users: {
      type: Array,
      default(){
        return []
      }
    },
    total:{
      type: Number,
      default: 0
    },
    usersMes:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      isShow: false,
      isDelete: false,
      currentIndex: 0,
      onlyUser: {}
    }
  },
  methods:{
    //监听 pagesize改变的事件
    handleSizeChange(newSize){
      this.$emit('handleSizeChange',newSize)
    },
    //监听 页码改变的事件
    handleCurrentChange(newPage){
      this.$emit('handleCurrentChange', newPage)
    },
    change(userInfo){
      this.$emit('change', userInfo)
    },
    async deleted(index){
      this.currentIndex = index
      const confirm = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if(confirm !== 'confirm') return this.$message.info('已取消删除')
      this.$emit('reGet', this.users, this.currentIndex)
    },
    editMes(index){
      const {id, username} = this.users[index]
      this.onlyUser = {id, username, email:'', mobile:''}
      this.isShow = true
    },
    isFalse(){
      this.isShow = false
    },
    editUserMes(usersMes){
      this.$emit('editUserMes', usersMes)
      setTimeout(()=>{
        this.isFalse()
      }, 300)
    }
  }
}
</script>

<style scoped>
.table{
  margin-top: 15px;
  font-size: 13px;
}
.el-pagination{
  margin-top: 15px;
}
</style>
