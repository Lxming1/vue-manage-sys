<template>
  <el-dialog
    title="添加用户"
    :visible.sync="isShow"
    width="50%"
    :before-close="isFalse"
    @close="close"
    :close-on-click-modal="false">
    <el-form label-width="70px" :model="message" :rules="rules" ref="formRef">
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
  name: "users_dialog",
  props:{
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data(){
    const checkEmail = (rule, value, cb) =>{
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])/
      if(regEmail.test(value)){
        return cb()
      }
      cb(new Error('请输入合法的邮箱！'))
    }
    const checkMobile = (rule, value, cb) =>{
      const regMobile = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/
      if(regMobile.test(value)){
        return cb()
      }
      cb(new Error('请输入合法的手机号！'))
    }
    return {
      addMes: ['用户名', '密码', '邮箱', '手机'],
      message:{
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules:{
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '请输入3~10个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 15, message: '请输入6~15个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    isFalse() {
      this.$emit('isFalse')
    },
    commit() {
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
