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
            <el-button icon="el-icon-setting" type="warning" size="mini" @click="addRoles(scope.row)"></el-button>
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
    <users_addRoles :showRole="showRole"
                    @isFalse="isFalses"
                    @finish="finish"
                    :twoName="twoName"
                    :rolesList="rolesList"
                    @selectClose="selectClose"/>
  </div>
</template>

<script>
import users_addRoles from './users_addRoles'
import users_editDialog from './users_editDialog'
import {pagination} from '@/common/mixin'

export default {
  name: "users_table",
  components:{
    users_editDialog,
    users_addRoles
  },
  mixins:[pagination],
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
      showRole: false,
      onlyUser: {},
      twoName: {},
      rolesList: []
    }
  },
  methods:{
    change(userInfo){
      this.$emit('change', userInfo)
    },
    async deleted(index){
      const confirm = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if(confirm !== 'confirm') return this.$message.info('已取消删除')
      this.$emit('reGet', this.users, index)
    },
    editMes(index){
      const {id, username} = this.users[index]
      this.onlyUser = {id, username, email:'', mobile:''}
      this.isShow = true
    },
    isFalse(){
      this.isShow = false
    },
    isFalses(){
      this.showRole = false
    },
    editUserMes(usersMes){
      this.$emit('editUserMes', usersMes)
      setTimeout(()=>{
        this.isFalse()
      }, 300)
    },
    async addRoles(mes){
      this.twoName = mes
      const {data: res} = await this.$http.get('roles')
      if(res.meta.status !== 200) return this.$message.error('获取角色列表失败！')
      this.rolesList = res.data
      this.showRole = true
    },
    async finish(newRoleId){
      const {data:res} = await this.$http.put(`users/${this.twoName.id}/role`, {
        rid: newRoleId
      })
      if(res.meta.status !== 200) return this.$message.error('更新角色失败！')
      this.$message.success('更新角色成功！')
      this.$emit('updateMes')
      this.showRole = false
    },
    selectClose(){
      this.twoName = {}
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
