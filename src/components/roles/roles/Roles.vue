<template>
<div>
  <breadcrumb>
    <span slot="one">权限管理</span>
    <span slot="two">角色列表</span>
  </breadcrumb>
  <el-card>
    <el-button
      type="primary"
      @click="isShow = true">
      添加角色
    </el-button>
    <roles_table
      :rolesMes="rolesMes"
      @reGet="reGet"
      @deleteLimit="deleteLimit"
      @updateMes="getRolesMes"
      @editRoleMes="editRoleMes"/>
  </el-card>
  <roles_addDialog
    :isShow="isShow"
    @isFalse="isShow = false"
    @commit="commit"/>
</div>
</template>

<script>
import breadcrumb from '@/components/common/breadcrumb'
import roles_table from './childComponents/roles_table'
import roles_addDialog from './childComponents/roles_addDialog'
export default {
  name: "Rolse",
  components:{
    breadcrumb,
    roles_table,
    roles_addDialog
  },
  data(){
    return {
      rolesMes: [],
      isShow: false
    }
  },
  created() {
    this.getRolesMes()
  },
  methods:{
    async getRolesMes(){
      const {data: res} = await this.$http.get('roles')
      if(res.meta.status !== 200) return this.$message.error('获取角色列表失败！')
      this.rolesMes = res.data
    },
    async commit(mes){
      const {data: res} = await this.$http.post('roles', mes)
      if(res.meta.status !== 201) return this.$message.error('添加角色失败！')
      this.$message.success('添加角色成功！')
      this.isShow = false
      await this.getRolesMes()
    },
    async reGet(roleMes, index){
      const {data: res} = await this.$http.delete(`roles/${roleMes[index].id}`)
      if(res.meta.status !== 200) return this.$message.error('删除角色失败！')
      this.$message.success('删除角色成功！')
      this.rolesMes.splice(index, 1)
      await this.getRolesMes()
    },
    async deleteLimit(roleId, rightsId, index){
      const {data: res} = await this.$http.delete(`roles/${roleId}/rights/${rightsId}`)
      if(res.meta.status !== 200) return this.$message.error('删除权限失败！')
      this.$message.success('删除权限成功！')
      this.rolesMes[index].children = res.data
    },
    async editRoleMes(obj){
      const {data: res} = await this.$http.put(`roles/${obj.id}`, obj)
      if (res.meta.status !== 200) return this.$message.error('编辑角色信息失败！')
      this.$message.success('编辑角色信息成功！')
      await this.getRolesMes()
    }
  }
}
</script>

<style scoped>

</style>
