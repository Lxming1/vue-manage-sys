<template>
  <el-steps :space="200" :active="activeIndex" finish-status="success" align-center>
    <el-step v-for="item in titles" :title="item"/>
  </el-steps>
</template>

<script>
export default {
  name: "agv_steps",
  props:{
    activeIndex:{
      type: Number,
      default: 0
    }
  },
  data(){
    return{
      titles: ['基本信息','商品参数','商品属性','商品图片','商品内容','完成']
    }
  }
}
</script>

<style scoped>
.el-steps{
  margin-top: 15px;
}
</style>
