<template>
<div>
<!--  面包屑导航区-->
  <breadcrumb>
    <span slot="one">用户管理</span>
    <span slot="two">用户列表</span>
  </breadcrumb>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" clearable @clear="getUsersMes" v-model="usersMes.query">
          <el-button slot="append" icon="el-icon-search" @click="getUsersMes"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" round @click="dialogVisible">添加用户</el-button>
      </el-col>
    </el-row>
    <users_table
      :users="users"
      :total="total"
      :usersMes="usersMes"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @change="change"
      @reGet="reGet"
      @editUserMes="editUserMes"
      @updateMes="getUsersMes"/>
  </el-card>
  <users_addDialog :isShow="isShow" @isFalse="isFalse" @commit="commit"/>
</div>
</template>

<script>
import breadcrumb from '@/components/common/breadcrumb'
import users_table from '@/components/user/user/childComponents/users_table'
import users_addDialog from '@/components/user/user/childComponents/users_addDialog'

export default {
  name: "User",
  components:{
    breadcrumb,
    users_table,
    users_addDialog
  },
  data(){
    return{
      usersMes:{
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      users: [],
      total: null,
      isShow: false
    }
  },
  created() {
    this.getUsersMes()
  },
  methods:{
    //获取最新的数据
    async getUsersMes(){
      const {data: res} = await this.$http.get('users', {params: this.usersMes})
      if(res.meta.status !== 200) return this.$message.error('获取用户信息失败！')
      this.users = res.data.users
      this.total = res.data.total
    },
    //分类项一页显示多少数据
    handleSizeChange(newSize){
      this.usersMes.pagesize = newSize
      this.getUsersMes()
    },
    //分类项当前有多少页数据
    handleCurrentChange(newPage){
      this.usersMes.pagenum = newPage
      this.getUsersMes()
    },
    //状态改变事件
    async change(userInfo){
      const {data: res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if(res.meta.status !== 200) {
        //更新失败后要保证状态未被改变
        this.userInfo.mg_state = !this.userInfo.mg_state
        return this.$message.error('更新用户状态失败！')
      }
      this.$message.success('更新用户状态成功！')
    },
    //dialog是否显示
    dialogVisible(){
      this.isShow = true
    },
    isFalse(){
      this.isShow = false
    },
    //添加用户事件
    async commit(mes){
      const {data: res} = await this.$http.post('users', mes)
      if(res.meta.status !== 201) return this.$message.error('添加用户失败！')
      this.$message.success('添加用户成功！')
      this.isShow = false
      await this.getUsersMes()
    },
    //移除用户事件
    async reGet(userInfo, index){
      const {data: res} = await this.$http.delete(`users/${userInfo[index].id}`)
      if(res.meta.status !== 200) return this.$message.error('删除用户失败！')
      this.$message.success('删除用户成功！')
      this.users.splice(index, 1)
      await this.getUsersMes()
    },
    async editUserMes(userMes) {
      const {data: res} = await this.$http.put(`users/${userMes.id}`, userMes)
      if (res.meta.status !== 200) return this.$message.error('编辑用户信息失败！')
      this.$message.success('编辑用户信息成功！')
      await this.getUsersMes()
    }
  }
}
</script>

<style scoped>

</style>
