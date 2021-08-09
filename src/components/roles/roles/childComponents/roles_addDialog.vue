<template>
  <el-dialog
    title="添加用户"
    :visible.sync="isShow"
    width="50%"
    :before-close="isFalse"
    @close="close"
    :close-on-click-modal="false">
    <el-form label-width="70px" :model="message" ref="formRef">
      <el-form-item :label="item" v-for="(item,index) in addMes"
                    :prop="Object.keys(message)[index]">
        <el-input v-model="message[Object.keys(message)[index]]"
                  :placeholder="showMes(item)"
                  :type="isPassword(item)"></el-input>
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
  name: "roles_addDialog",
  props:{
    isShow:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      addMes:['角色名称', '角色描述'],
      message:{
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods:{
    isFalse() {
      this.$emit('isFalse')
    },
    commit(){
      this.$refs.formRef.validate(valid =>{
        if(!valid) return
        this.$emit('commit', this.message)
      })
    },
    showMes(mes) {
      return '请输入' + mes
    },
    isPassword(item){
      if(item === '密码'){
        return 'password'
      }
    },
    close(){
      this.$refs.formRef.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
