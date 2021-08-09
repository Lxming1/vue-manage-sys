<template>
  <div>
    <!--    表格区域-->
    <el-table
      class="table"
      :data="rolesMes"
      style="width: 100%"
      stripe
      border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row :key="tag.id"
                  v-for="tag in scope.row.children"
                  :class="['bBorder', index === 0 ? 'tBorder' : '']">
            <el-col :span="5">
              <el-tag closable @close="deletedIt(scope.$index, tag.id)"> {{tag.authName}} </el-tag>
              <i class="el-icon-caret-right"/>
            </el-col>
            <el-col :span="19">
              <el-row :key="tag1.id"
                      v-for="(tag1,index1) in tag.children"
                      :class="[index1 === 0 ? '' : 'tBorder']">
                <el-col :span="6">
                  <el-tag type="success" closable @close="deletedIt(scope.$index, tag1.id)"> {{tag1.authName}} </el-tag>
                  <i class="el-icon-caret-right"/>
                </el-col>
                <el-col :span="18">
                  <el-tag closable
                          :key="tag2.id"
                          v-for="tag2 in tag1.children"
                          type="warning"
                          @close="deletedIt(scope.$index, tag2.id)">
                    {{tag2.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column prop="mobile" label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="primary" size="mini" @click="editMes(scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" type="danger" size="mini" @click="deleted(scope.$index)">删除</el-button>
          <el-button icon="el-icon-setting" type="warning" size="mini" @click="showDialog(scope.$index)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <roles_showDialog :dialogVisible="dialogVisible"
                      @isFalse="isFalse"
                      :message="treeMes"
                      @mesNull="mesNull"
                      :arr="arr"
                      @commit="editCommit"
                      ref="showDialog"/>
    <roles_editDialog :editShow="editShow" @isFalse="isFalses" :editObj="editObj" @editRoleMes="editRoleMes"/>
  </div>
</template>

<script>
import roles_editDialog from './roles_editDialog'
import roles_showDialog from './roles_showDialog'
export default {
  name: "roles_table",
  components:{
    roles_showDialog,
    roles_editDialog
  },
  props:{
    rolesMes:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      dialogVisible: false,
      treeMes: [],
      arr: [],
      currentId: '',
      editShow: false,
      editObj: {}
    }
  },
  methods:{
    //删除用户按钮
    async deleted(index){
      this.currentIndex = index
      const confirm = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if(confirm !== 'confirm') return this.$message.info('已取消删除')
      this.$emit('reGet', this.rolesMes, index)
    },
    //删除权限按钮
    async deletedIt(index, id){
      const confirm = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if(confirm !== 'confirm') return this.$message.info('已取消删除')
      this.$emit('deleteLimit',this.rolesMes[index].id, id, index)
    },
    //分配权限按钮
    async showDialog(index){
      this.currentId = this.rolesMes[index].id
      const {data: res} = await this.$http.get('rights/tree')
      this.treeMes = res.data
      for(let item of this.rolesMes[index].children){
        for(let item1 of item.children){
          for(let item2 of item1.children){
            this.arr.push(item2.id)
          }
        }
      }
      this.dialogVisible = true
    },
    isFalse(){
      this.dialogVisible = false
    },
    isFalses(){
      this.editShow = false
    },
    mesNull(){
      this.arr = []
    },
    //分配权限确认按钮
    async editCommit(idStr){
      const {data: res} = await this.$http.post(`roles/${this.currentId}/rights`, { rids: idStr })
      if(res.meta.status !== 200) return this.$message.error('分配权限失败！')
      this.$message.success('分配权限成功！')
      this.$emit('updateMes')
      this.isFalse()
    },
    editMes(user){
      this.editShow = true
      const {id} = user
      this.editObj = {id, roleName: '', roleDesc: ''}
    },
    editRoleMes(obj){
      this.$emit('editRoleMes', obj)
      this.editShow = false
    }
  }
}
</script>

<style scoped>
.table{
  margin-top: 15px;
  font-size: 13px;
}
.el-row{
  display: flex;
  align-items: center;
}
.el-tag{
  margin: 7px;
}
.tBorder{
  border-top: 1px solid #eee;
}
.bBorder{
  border-bottom: 1px solid #eee;
}
</style>
