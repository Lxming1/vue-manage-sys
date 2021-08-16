<template>
  <div>
    <el-table
      class="table"
      :data="arr"
      style="width: 100%"
      stripe
      border>
      <el-table-column type="expand" width="50">
        <template slot-scope="scope">
          <params_tabs_table_tag :scope="scope.row" @updateTags="updateTags"/>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="attr_name" :label="title + '名称'"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editClick(scope.row)">编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <params_tabs_table_edit
      :title="editTitle"
      :isShow="editShow"
      @isFalse="editShow = false"
      @commit="commit"/>
  </div>
</template>

<script>
import params_tabs_table_edit from './params_tabs_table_edit'
import params_tabs_table_tag from './params_tabs_table_tag'
export default {
  name: "params_tabs_table",
  components:{
    params_tabs_table_edit,
    params_tabs_table_tag
  },
  props:{
    arr:{
      type: Array,
      default(){
        return []
      }
    },
    title:{
      type: String,
      default: ''
    },
    editTitle:{
      type: String,
      default: ''
    }
  },
  data(){
    return {
      editShow: false,
      nexttitle: '',
      currentId: ''
    }
  },
  methods:{
    editClick(obj){
      this.currentId = obj.attr_id
      this.editShow = true
    },
    commit(mes){
      this.$emit('editCommit', mes, this.currentId)
      this.editShow = false
    },
    async deleteClick(obj){
      let id = obj.attr_id
      const confirm = await this.$confirm(`此操作将永久删除该${this.title}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if(confirm !== 'confirm') return this.$message.info('已取消删除')
      this.$emit('deleteAtr', id)
    },
    updateTags(mes, id) {
      this.$emit('updateTags', mes, id)
    },
    clearArr(){
      this.$bus.$on('clearArr', ()=>{
        this.manyArr = []
        this.onlyArr = []
      })
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
