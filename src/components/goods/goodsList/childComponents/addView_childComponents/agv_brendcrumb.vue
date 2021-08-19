<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/goods'}">商品列表</el-breadcrumb-item>
    <el-breadcrumb-item>添加商品</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "addView_brendcrumb"
}
</script>

<style scoped>

</style>
