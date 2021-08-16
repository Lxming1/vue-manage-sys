<template>
  <el-alert
    :title="alertMes"
    type="warning"
    show-icon
    :closable="false"/>
</template>

<script>
export default {
  name: "params_alert",
  data(){
    return {
      alertMes: '注意：只允许为第三级分类设置相关参数！'
    }
  }
}
</script>

<style scoped>

</style>
