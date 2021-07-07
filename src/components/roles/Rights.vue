<template>
<div>
  <breadcrumb>
    <span slot="one">权限管理</span>
    <span slot="two">权限列表</span>
  </breadcrumb>
</div>
</template>

<script>
import breadcrumb from '@/components/common/breadcrumb'
export default {
  name: "Rights",
  components:{
    breadcrumb
  }
}
</script>

<style scoped>

</style>
