<template>
  <div class="login_container">
    <div class="login_face">
      <div class="login_img">
        <img src="../assets/img/logo.png" alt="">
      </div>
      <el-form class="login_form" :model="form" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名"
                    prefix-icon="el-icon-user"
                    v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码"
                    prefix-icon="el-icon-lock"
                    v-model="form.password"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item class="login_button">
          <el-button type="primary" round @click="commit">提交</el-button>
          <el-button type="info" round @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    window.onkeydown = e => {
      if (e.key === 'Enter') {
        this.commit()
      }
    }
  },
  methods: {
    commit () {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.form)
        if (res.meta.status !== 200) return this.$message.error('登陆失败！')
        this.$message.success('登陆成功！')
        window.sessionStorage.setItem('token', res.data.token)
        await this.$router.push('/home')
      })
    },
    clear () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}
.login_face{
  height: 300px;
  width: 450px;
  background-color: #fff;
  position: absolute;
  border-radius: 3px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #ddd;
}
.login_img{
  height: 130px;
  width: 130px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.login_img img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login_form{
  margin-top: 105px;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
}
.login_button{
  display: flex;
  justify-content: center;
}
</style>
