<template>
  <el-dialog
    title="修改角色信息"
    :visible.sync="editShow"
    width="50%"
    @close="close"
    :before-close="isFalse"
    :close-on-click-modal="false">
    <el-form label-width="70px" :model="editObj" ref="formRef">
      <el-form-item
        :label="item" v-for="(item,index) in addMes"
        :prop="Object.keys(editObj)[index+1]">
        <el-input
          v-model="editObj[Object.keys(editObj)[index+1]]"
          :placeholder="showMes(item)"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isFalse">取 消</el-button>
      <el-button type="primary" @click="commit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "roles_editDialog",
  props:{
    editShow: {
      type: Boolean,
      default: false
    },
    editObj: {
      type: Object,
      default:{
        return: []
      }
    }
  },
  data(){
    return{
      addMes: ['角色名称', '角色描述']
    }
  },
  methods:{
    isFalse(){
      this.$emit('isFalse')
    },
    showMes(mes){
      return '请输入' + mes
    },
    close(){
      this.$refs.formRef.resetFields()
    },
    commit(){
      this.$refs.formRef.validate(valid =>{
        if(!valid) return
        const {id, roleName, roleDesc} = this.editObj
        this.$emit('editRoleMes', {id, roleName, roleDesc})
      })
    }
  }
}
</script>

<style scoped>

</style>
