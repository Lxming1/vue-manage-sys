<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-input placeholder="用户查询" clearable @clear="getUsersMes" v-model="usersMes.query">
        <el-button slot="append" icon="el-icon-search" @click="getUsersMes"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" round @click="dialogVisible">添加用户</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "users_addUserInput",
  props:{
    usersMes: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    getUsersMes(){
      this.$emit('getUsersMes')
    },
    dialogVisible(){
      this.$emit('isShow')
    }
  }
}
</script>

<style scoped>

</style>
